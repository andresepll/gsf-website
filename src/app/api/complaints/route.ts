import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { render } from "@react-email/render";
import InternalNotification from "@/lib/email/InternalNotification";
import UserAcknowledgement from "@/lib/email/UserAcknowledgement";

export const runtime = "nodejs";

const ALLOWED_TYPES = ["complaint", "grievance", "report"] as const;
const ALLOWED_LOCALES = ["es", "en"] as const;
type ComplaintType = (typeof ALLOWED_TYPES)[number];
type Locale = (typeof ALLOWED_LOCALES)[number];

type ComplaintPayload = {
  type: ComplaintType;
  anonymous: boolean;
  name?: string;
  email?: string;
  phone?: string;
  subject: string;
  description: string;
  locale: Locale;
};

const SENDER_FROM = "Generadora San Felipe <noresponder@gsf.com.do>";
const REPLY_TO_FALLBACK = "contacto@gsf.com.do";

const REFERENCE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateReferenceId(): string {
  const d = new Date();
  const yyyymmdd = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += REFERENCE_CHARS[Math.floor(Math.random() * REFERENCE_CHARS.length)];
  }
  return `GSF-${yyyymmdd}-${random}`;
}

type ValidationResult =
  | { ok: true; data: ComplaintPayload }
  | { ok: false; error: string };

function validate(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object") return { ok: false, error: "Invalid body" };
  const body = raw as Record<string, unknown>;

  if (!ALLOWED_TYPES.includes(body.type as ComplaintType)) {
    return { ok: false, error: "Invalid type" };
  }
  if (typeof body.anonymous !== "boolean") {
    return { ok: false, error: "Invalid anonymous flag" };
  }
  if (
    typeof body.subject !== "string" ||
    body.subject.trim().length === 0 ||
    body.subject.length > 200
  ) {
    return { ok: false, error: "Subject must be 1-200 characters" };
  }
  if (
    typeof body.description !== "string" ||
    body.description.trim().length === 0 ||
    body.description.length > 5000
  ) {
    return { ok: false, error: "Description must be 1-5000 characters" };
  }
  if (!ALLOWED_LOCALES.includes(body.locale as Locale)) {
    return { ok: false, error: "Invalid locale" };
  }

  let name: string | undefined;
  let email: string | undefined;
  let phone: string | undefined;

  if (!body.anonymous) {
    if (
      typeof body.name !== "string" ||
      body.name.trim().length === 0 ||
      body.name.length > 200
    ) {
      return { ok: false, error: "Name required for non-anonymous submissions" };
    }
    if (
      typeof body.email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) ||
      body.email.length > 200
    ) {
      return { ok: false, error: "Valid email required for non-anonymous submissions" };
    }
    name = body.name.trim();
    email = body.email.trim();
    if (typeof body.phone === "string" && body.phone.trim().length > 0) {
      if (body.phone.length > 50) {
        return { ok: false, error: "Invalid phone" };
      }
      phone = body.phone.trim();
    }
  }

  return {
    ok: true,
    data: {
      type: body.type as ComplaintType,
      anonymous: body.anonymous,
      name,
      email,
      phone,
      subject: (body.subject as string).trim(),
      description: (body.description as string).trim(),
      locale: body.locale as Locale,
    },
  };
}

const TYPE_LABEL_ES: Record<ComplaintType, string> = {
  complaint: "queja",
  grievance: "reclamo",
  report: "denuncia",
};

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots populate the hidden "website" field; humans never see it.
  // Silently return a success-looking response so the bot does not retry.
  // Runs before env/validation so the response is consistent regardless of
  // server state and never leaks anything to probing tools.
  if (
    raw &&
    typeof raw === "object" &&
    typeof (raw as Record<string, unknown>).website === "string" &&
    ((raw as Record<string, unknown>).website as string).trim().length > 0
  ) {
    return NextResponse.json(
      { ok: true, referenceId: generateReferenceId() },
      { status: 201 }
    );
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const RESEND_KEY = process.env.RESEND_API_KEY;
  const NOTIFICATION_EMAIL = process.env.COMPLAINTS_NOTIFICATION_EMAIL;

  if (!SUPABASE_URL || !SUPABASE_KEY || !RESEND_KEY || !NOTIFICATION_EMAIL) {
    console.error("[complaints] Missing env vars");
    return NextResponse.json(
      { ok: false, error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const v = validate(raw);
  if (!v.ok) {
    return NextResponse.json({ ok: false, error: v.error }, { status: 400 });
  }
  const data = v.data;
  const referenceId = generateReferenceId();

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { error: dbError } = await supabase.from("complaints").insert({
    reference_id: referenceId,
    type: data.type,
    anonymous: data.anonymous,
    name: data.name ?? null,
    email: data.email ?? null,
    phone: data.phone ?? null,
    subject: data.subject,
    description: data.description,
    locale: data.locale,
  });

  if (dbError) {
    console.error("[complaints] Supabase insert failed:", dbError);
    return NextResponse.json(
      { ok: false, error: "Could not save report" },
      { status: 500 }
    );
  }

  // Fire-and-log emails. If they fail, the row is still saved so the report
  // is not lost — the admin will see it on Supabase even without email.
  const resend = new Resend(RESEND_KEY);

  try {
    const internalHtml = await render(
      InternalNotification({
        referenceId,
        type: data.type,
        anonymous: data.anonymous,
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        description: data.description,
        locale: data.locale,
      })
    );
    await resend.emails.send({
      from: SENDER_FROM,
      to: NOTIFICATION_EMAIL,
      replyTo: data.email ?? REPLY_TO_FALLBACK,
      subject: `[GSF ${referenceId}] Nueva ${TYPE_LABEL_ES[data.type]}: ${data.subject}`,
      html: internalHtml,
    });
  } catch (err) {
    console.error("[complaints] Internal notification email failed:", err);
  }

  if (!data.anonymous && data.email) {
    try {
      const userHtml = await render(
        UserAcknowledgement({
          referenceId,
          name: data.name,
          subject: data.subject,
          locale: data.locale,
        })
      );
      const userSubject =
        data.locale === "es"
          ? `Confirmación de su reporte ${referenceId} — Generadora San Felipe`
          : `Confirmation of your report ${referenceId} — Generadora San Felipe`;
      await resend.emails.send({
        from: SENDER_FROM,
        to: data.email,
        replyTo: REPLY_TO_FALLBACK,
        subject: userSubject,
        html: userHtml,
      });
    } catch (err) {
      console.error("[complaints] User acknowledgement email failed:", err);
    }
  }

  return NextResponse.json({ ok: true, referenceId }, { status: 201 });
}
