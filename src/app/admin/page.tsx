import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Lead Studio",
  robots: { index: false, follow: false },
};

const COOKIE = "ac_studio";

function configuredPasscode() {
  return process.env.ADMIN_PASSCODE ?? "anthony";
}

async function signIn(formData: FormData) {
  "use server";

  const passcode = String(formData.get("passcode") ?? "").trim();
  if (passcode !== configuredPasscode()) {
    redirect("/admin?error=1");
  }

  const store = await cookies();
  store.set(COOKIE, passcode, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}

async function signOut() {
  "use server";

  const store = await cookies();
  store.delete(COOKIE);
  redirect("/admin");
}

async function updateStatus(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));
  const status = String(formData.get("status") ?? "new");

  if (!Number.isFinite(id) || !["new", "contacted", "archived"].includes(status)) {
    return;
  }

  await db.update(leads).set({ status }).where(eq(leads.id, id));
  revalidatePath("/admin");
}

type LeadRow = typeof leads.$inferSelect;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const store = await cookies();
  const authorised = store.get(COOKIE)?.value === configuredPasscode();

  if (!authorised) {
    return (
      <section className="flex min-h-[85svh] items-center bg-navy py-32 text-ivory">
        <div className="container-lux">
          <div className="mx-auto max-w-md border border-ivory/15 bg-navy-deep/60 p-8 md:p-10">
            <span className="eyebrow text-champagne-soft">Lead Studio</span>
            <h1 className="mt-5 font-display text-3xl text-white">
              Private access
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-ivory/60">
              Enter the studio passcode to review enquiries submitted through
              the website.
            </p>
            <form action={signIn} className="mt-7 space-y-4">
              <div>
                <label htmlFor="passcode" className="label-lux !text-ivory/60">
                  Passcode
                </label>
                <input
                  id="passcode"
                  name="passcode"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="field field-dark"
                  placeholder="Enter passcode"
                />
              </div>
              {params.error && (
                <p className="border-l-2 border-champagne bg-white/5 px-3 py-2 text-[0.8rem] text-ivory/80">
                  That passcode was not recognised.
                </p>
              )}
              <button type="submit" className="btn btn-gold w-full">
                Enter Studio
              </button>
            </form>
            <p className="mt-6 text-[0.68rem] leading-relaxed text-ivory/35">
              Default passcode: <span className="text-champagne">anthony</span>.
              Set <code className="text-ivory/60">ADMIN_PASSCODE</code> in your
              environment to change it.
            </p>
          </div>
        </div>
      </section>
    );
  }

  let rows: LeadRow[] = [];
  let loadError = "";

  try {
    rows = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(60);
  } catch {
    loadError =
      "The leads table is not available yet. Run `npx drizzle-kit push` to create it.";
  }

  const newCount = rows.filter((row) => row.status === "new").length;
  const residentialCount = rows.filter((row) => row.type === "residential").length;
  const commercialCount = rows.filter((row) => row.type === "commercial").length;

  return (
    <section className="bg-ivory pt-32 pb-20">
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-6 border-b border-navy/10 pb-8 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Lead Studio</span>
            <h1 className="mt-5 font-display text-[2.4rem] leading-tight text-navy sm:text-[3rem]">
              Website enquiries
            </h1>
            <p className="mt-3 text-sm text-charcoal/60">
              Every residential quote, commercial proposal and contact enquiry
              submitted through {site.name}.
            </p>
          </div>
          <form action={signOut}>
            <button type="submit" className="btn btn-outline-dark !py-3 !text-[0.65rem]">
              Sign Out
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Total enquiries", rows.length],
            ["New", newCount],
            ["Residential", residentialCount],
            ["Commercial", commercialCount],
          ].map(([label, value]) => (
            <div key={String(label)} className="bg-white px-6 py-6">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-charcoal/45">
                {label}
              </p>
              <p className="mt-2 font-display text-4xl text-navy">{value}</p>
            </div>
          ))}
        </div>

        {loadError && (
          <p className="mt-8 border-l-2 border-red-800 bg-red-50 px-4 py-3 text-sm text-red-900">
            {loadError}
          </p>
        )}

        {!loadError && rows.length === 0 && (
          <div className="mt-10 border border-dashed border-navy/20 bg-white p-12 text-center">
            <p className="font-display text-2xl text-navy">No enquiries yet.</p>
            <p className="mt-3 text-sm text-charcoal/60">
              Submissions from the residential, commercial and contact forms will
              appear here.
            </p>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {rows.map((row) => (
            <article
              key={row.id}
              className="border border-navy/10 bg-white p-6 md:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="border border-champagne/50 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-champagne">
                      {row.type}
                    </span>
                    <span
                      className={`px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] ${
                        row.status === "new"
                          ? "bg-navy text-ivory"
                          : row.status === "contacted"
                            ? "bg-stone text-charcoal"
                            : "bg-charcoal/10 text-charcoal/50"
                      }`}
                    >
                      {row.status}
                    </span>
                    <span className="text-[0.65rem] uppercase tracking-[0.16em] text-charcoal/40">
                      {row.reference}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-[1.6rem] leading-tight text-navy">
                    {row.name}
                    {row.company ? ` · ${row.company}` : ""}
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[0.82rem] text-charcoal/65">
                    <a href={`mailto:${row.email}`} className="hover:text-navy">
                      {row.email}
                    </a>
                    {row.phone && (
                      <a href={`tel:${row.phone}`} className="hover:text-navy">
                        {row.phone}
                      </a>
                    )}
                    <span className="text-charcoal/40">
                      {new Date(row.createdAt).toLocaleString("en-GB", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>
                <form action={updateStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={row.id} />
                  <select
                    name="status"
                    defaultValue={row.status}
                    aria-label={`Status for ${row.name}`}
                    className="field !w-auto !py-2 !text-[0.75rem]"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button
                    type="submit"
                    className="btn btn-navy !px-4 !py-2.5 !text-[0.62rem]"
                  >
                    Update
                  </button>
                </form>
              </div>

              <dl className="mt-5 grid gap-x-8 gap-y-3 border-t border-navy/10 pt-5 text-[0.82rem] sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Property", row.propertyAddress],
                  ["Property type", row.propertyType],
                  ["Size", row.propertySize],
                  ["Services", row.services],
                  ["Preferred date", row.preferredDate],
                  ["Frequency", row.frequency],
                  ["Source", row.sourcePage],
                ]
                  .filter(([, value]) => Boolean(value))
                  .map(([label, value]) => (
                    <div key={String(label)}>
                      <dt className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-charcoal/40">
                        {label}
                      </dt>
                      <dd className="mt-1 leading-relaxed text-charcoal/75">
                        {value}
                      </dd>
                    </div>
                  ))}
              </dl>

              {row.message && (
                <div className="mt-5 border-l border-champagne/50 pl-4">
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-charcoal/40">
                    Message
                  </p>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed whitespace-pre-line text-charcoal/75">
                    {row.message}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>

        {rows.length > 0 && (
          <p className="mt-8 text-[0.75rem] text-charcoal/45">
            Showing the most recent {rows.length} enquiries.
          </p>
        )}
      </div>
    </section>
  );
}
