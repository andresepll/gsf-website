const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
  hostname?: string;
  challenge_ts?: string;
};

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: "missing-token" | "invalid-token" | "verify-failed" };

export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string
): Promise<VerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[security] TURNSTILE_SECRET_KEY not set");
    return { ok: false, reason: "verify-failed" };
  }

  if (!token || typeof token !== "string" || token.trim().length === 0) {
    return { ok: false, reason: "missing-token" };
  }

  const body = new URLSearchParams();
  body.append("secret", secret);
  body.append("response", token);
  if (remoteIp && remoteIp !== "unknown") body.append("remoteip", remoteIp);

  let res: Response;
  try {
    res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      // Don't let a hanging Turnstile endpoint block the route forever.
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error(
      "[security] Turnstile verify request failed:",
      err instanceof Error ? err.message : String(err)
    );
    return { ok: false, reason: "verify-failed" };
  }

  if (!res.ok) {
    console.error("[security] Turnstile verify HTTP", res.status);
    return { ok: false, reason: "verify-failed" };
  }

  const json = (await res.json()) as TurnstileResponse;
  if (!json.success) {
    return { ok: false, reason: "invalid-token" };
  }

  return { ok: true };
}
