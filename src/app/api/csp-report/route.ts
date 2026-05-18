import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// Rate limit to avoid log flooding from a single misbehaving client. Keyed by
// the masked source IP (first 3 octets) so multiple violations from the same
// page burst do not spam the logs but legitimate distributed reports still
// surface.
const SLIDING_WINDOW_MS = 60_000;
const MAX_REPORTS_PER_WINDOW = 20;
// Cap on simultaneously tracked buckets per edge isolate. Each entry is
// tiny but we still want a hard ceiling so a flood of distinct sources can't
// grow the map without bound until the isolate recycles.
const MAX_BUCKETS = 1000;
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function rateLimitKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for") ?? "";
  const ip = fwd.split(",")[0]?.trim() || "unknown";
  if (ip === "unknown") return ip;
  // Mask the last octet of IPv4, keep first 3 hextets of IPv6
  if (ip.includes(":")) return ip.split(":").slice(0, 3).join(":");
  const parts = ip.split(".");
  return parts.length === 4 ? parts.slice(0, 3).join(".") : ip;
}

function pruneExpired(now: number): void {
  const expired: string[] = [];
  buckets.forEach((b, k) => {
    if (b.resetAt < now) expired.push(k);
  });
  expired.forEach((k) => buckets.delete(k));
  // Still over cap after pruning expired? Drop oldest insertion order until fit.
  if (buckets.size > MAX_BUCKETS) {
    const excess = buckets.size - MAX_BUCKETS;
    const drop: string[] = [];
    buckets.forEach((_, k) => {
      if (drop.length < excess) drop.push(k);
    });
    drop.forEach((k) => buckets.delete(k));
  }
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    if (buckets.size >= MAX_BUCKETS) pruneExpired(now);
    buckets.set(key, { count: 1, resetAt: now + SLIDING_WINDOW_MS });
    return true;
  }
  if (bucket.count >= MAX_REPORTS_PER_WINDOW) return false;
  bucket.count++;
  return true;
}

function sanitize(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.slice(0, max).replace(/[\r\n\t]+/g, " ");
}

/**
 * Receives CSP violation reports from browsers.
 *
 * Two report formats are accepted:
 *   - Legacy CSP "report-uri" payload (Content-Type: application/csp-report)
 *     wrapped in { "csp-report": { ... } }
 *   - Modern Reporting API "report-to" payload (Content-Type: application/reports+json)
 *     which is an array of { type, age, url, body } entries
 *
 * Both are normalized and logged to the Vercel function output so violations
 * surface in observability without persisting personal data. No body, query,
 * or referrer fragments are echoed back — only the minimal shape needed to
 * understand which directive blocked what.
 */
export async function POST(req: NextRequest) {
  const rateKey = rateLimitKey(req);
  if (!checkRateLimit(rateKey)) {
    return new NextResponse(null, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const contentType = req.headers.get("content-type") ?? "";

  type NormalizedViolation = {
    directive: string;
    blockedUri: string;
    documentUri: string;
    statusCode?: number;
    sourceFile?: string;
    lineNumber?: number;
    sample?: string;
  };

  const violations: NormalizedViolation[] = [];

  if (contentType.includes("application/reports+json") && Array.isArray(payload)) {
    // Modern Reporting API format
    for (const entry of payload as Array<Record<string, unknown>>) {
      if (entry?.type !== "csp-violation") continue;
      const body = (entry.body ?? {}) as Record<string, unknown>;
      violations.push({
        directive: sanitize(body.effectiveDirective ?? body.violatedDirective, 80),
        blockedUri: sanitize(body.blockedURL ?? body["blocked-uri"], 200),
        documentUri: sanitize(body.documentURL ?? entry.url, 200),
        statusCode: typeof body.statusCode === "number" ? body.statusCode : undefined,
        sourceFile: sanitize(body.sourceFile, 200),
        lineNumber: typeof body.lineNumber === "number" ? body.lineNumber : undefined,
        sample: sanitize(body.sample, 200),
      });
    }
  } else {
    // Legacy report-uri format: { "csp-report": { ... } }
    const inner = (payload as Record<string, unknown>)?.["csp-report"] as
      | Record<string, unknown>
      | undefined;
    if (inner) {
      violations.push({
        directive: sanitize(inner["effective-directive"] ?? inner["violated-directive"], 80),
        blockedUri: sanitize(inner["blocked-uri"], 200),
        documentUri: sanitize(inner["document-uri"], 200),
        statusCode: typeof inner["status-code"] === "number" ? (inner["status-code"] as number) : undefined,
        sourceFile: sanitize(inner["source-file"], 200),
        lineNumber: typeof inner["line-number"] === "number" ? (inner["line-number"] as number) : undefined,
        sample: sanitize(inner["script-sample"], 200),
      });
    }
  }

  for (const v of violations) {
    if (!v.directive && !v.blockedUri) continue;
    // eslint-disable-next-line no-console
    console.warn(
      "[csp-violation]",
      JSON.stringify({
        directive: v.directive,
        blockedUri: v.blockedUri,
        documentUri: v.documentUri,
        statusCode: v.statusCode,
        sourceFile: v.sourceFile,
        lineNumber: v.lineNumber,
        sample: v.sample,
      })
    );
  }

  // 204 No Content is the standard response for both formats.
  return new NextResponse(null, { status: 204 });
}

// GET is intentionally unsupported — return 405 to signal misuse.
export function GET() {
  return new NextResponse(null, { status: 405 });
}
