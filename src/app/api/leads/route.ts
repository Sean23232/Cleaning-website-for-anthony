import { db } from "@/db";
import { leads } from "@/db/schema";

export const dynamic = "force-dynamic";

type LeadPayload = {
  type?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  propertyAddress?: string;
  propertyType?: string;
  propertySize?: string;
  services?: string[] | string;
  preferredDate?: string;
  frequency?: string;
  message?: string;
  sourcePage?: string;
  website?: string;
  elapsedMs?: number;
};

const VALID_TYPES = new Set(["residential", "commercial", "contact"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const entry = rateLimit.get(key);

  if (!entry || entry.resetAt < now) {
    rateLimit.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count += 1;
  return entry.count > 8;
}

function clean(value: unknown, max = 2000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function reference() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const random = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `AC-${stamp}${random}`;
}

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without storing them.
  if (clean(payload.website)) {
    return Response.json({ ok: true, reference: reference() });
  }

  if (typeof payload.elapsedMs === "number" && payload.elapsedMs < 900) {
    return Response.json(
      { ok: false, error: "Please take a moment to complete the form." },
      { status: 400 },
    );
  }

  const forwarded = request.headers.get("x-forwarded-for") ?? "local";
  const ip = forwarded.split(",")[0]?.trim() || "local";
  if (isRateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many enquiries. Please call us instead." },
      { status: 429 },
    );
  }

  const type = clean(payload.type, 32).toLowerCase();
  if (!VALID_TYPES.has(type)) {
    return Response.json({ ok: false, error: "Invalid enquiry type." }, { status: 400 });
  }

  const name = clean(payload.name, 160);
  const email = clean(payload.email, 200);
  const phone = clean(payload.phone, 60);
  const message = clean(payload.message, 4000);
  const company = clean(payload.company, 180);
  const propertyAddress = clean(payload.propertyAddress, 400);
  const propertyType = clean(payload.propertyType, 140);
  const propertySize = clean(payload.propertySize, 140);
  const preferredDate = clean(payload.preferredDate, 80);
  const frequency = clean(payload.frequency, 100);
  const sourcePage = clean(payload.sourcePage, 120);
  const services = Array.isArray(payload.services)
    ? payload.services.map((item) => clean(item, 120)).filter(Boolean).join(", ")
    : clean(payload.services, 600);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please share your name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Please share a valid email address.";
  if (type !== "contact" && phone.length < 6) errors.phone = "Please share a contact number.";
  if (type === "commercial" && company.length < 2)
    errors.company = "Please share your company name.";
  if (type === "contact" && message.length < 5)
    errors.message = "Please add a short message.";

  if (Object.keys(errors).length > 0) {
    return Response.json(
      { ok: false, error: "Please check the highlighted fields.", errors },
      { status: 422 },
    );
  }

  const record = {
    reference: reference(),
    type,
    name,
    email,
    phone: phone || null,
    company: company || null,
    propertyAddress: propertyAddress || null,
    propertyType: propertyType || null,
    propertySize: propertySize || null,
    services: services || null,
    preferredDate: preferredDate || null,
    frequency: frequency || null,
    message: message || null,
    sourcePage: sourcePage || `/${type}`,
  };

  try {
    await db.insert(leads).values(record);
    return Response.json({ ok: true, reference: record.reference });
  } catch (error) {
    console.error("Lead submission failed", error);
    return Response.json(
      {
        ok: false,
        error:
          "We could not save your enquiry. Please call or email our team directly and we will assist you personally.",
      },
      { status: 500 },
    );
  }
}
