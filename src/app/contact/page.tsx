import Link from "next/link";
import LeadForm from "@/components/lead-form";
import Reveal from "@/components/reveal";
import { JsonLd, LineIcon, PageHero } from "@/components/ui";
import { images } from "@/lib/images";
import { site, serviceAreas } from "@/lib/site";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact | Residential & Commercial Cleaning Enquiries",
  description:
    "Contact Anthony & Co. for premium residential and commercial cleaning in London. Call, email or send an enquiry for a tailored cleaning quote.",
  path: "/contact",
  keywords: [
    "cleaning company contact London",
    "request cleaning quote Mayfair",
    "commercial cleaning enquiry London",
  ],
});

const details = [
  {
    icon: "phone",
    label: "Telephone",
    value: site.phoneDisplay,
    href: site.phoneHref,
    note: "Click to call our team directly.",
  },
  {
    icon: "mail",
    label: "Email",
    value: site.email,
    href: site.emailHref,
    note: "We reply to enquiries personally.",
  },
  {
    icon: "pin",
    label: "Service Area",
    value: site.serviceArea,
    note: "Residential and commercial appointments.",
  },
  {
    icon: "clock",
    label: "Business Hours",
    value: "Mon – Fri 8:00 – 18:00",
    note: "Saturday 9:00 – 16:00 · Sunday by arrangement.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s Make Your Space
            <span className="block italic text-champagne-soft">Exceptional.</span>
          </>
        }
        description="Whether you're looking for residential or commercial cleaning, we'd love to learn more about your requirements."
        image={images.contactImage}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        primary={{ label: "Send an Enquiry", href: "#quote" }}
        secondary={{ label: "Call Our Team", href: site.phoneHref }}
        size="compact"
      />

      <section className="bg-ivory py-16 md:py-20">
        <div className="container-lux grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">Contact Details</span>
            <h2 className="mt-6 font-display text-[2.1rem] leading-[1.06] text-navy sm:text-[2.6rem]">
              We are here to help.
            </h2>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-charcoal/70">
              For a quote or a conversation about your property, contact us
              directly or complete the enquiry form. Every enquiry is read and
              answered personally.
            </p>

            <div className="mt-9 divide-y divide-navy/10 border-y border-navy/10">
              {details.map((detail) => {
                const content = (
                  <>
                    <LineIcon
                      name={detail.icon}
                      className="h-6 w-6 shrink-0 text-champagne"
                    />
                    <div>
                      <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-charcoal/45">
                        {detail.label}
                      </p>
                      <p className="mt-1.5 text-[0.95rem] leading-snug break-words text-navy">
                        {detail.value}
                      </p>
                      <p className="mt-1 text-[0.78rem] leading-relaxed text-charcoal/55">
                        {detail.note}
                      </p>
                    </div>
                  </>
                );

                return detail.href ? (
                  <a
                    key={detail.label}
                    href={detail.href}
                    className="flex gap-5 py-5 transition-colors hover:bg-white/60"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={detail.label} className="flex gap-5 py-5">
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 border border-champagne/35 bg-white p-6">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-champagne">
                Service Area
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {serviceAreas.map((area) => (
                  <li
                    key={area}
                    className="text-[0.78rem] text-charcoal/65 before:mr-2 before:text-champagne before:content-['·']"
                  >
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.75rem] leading-relaxed text-charcoal/50">
                Outside these areas? Send an enquiry and we will confirm whether
                we can assist.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={site.phoneHref} className="btn btn-navy">
                Click to Call
              </a>
              <a href={site.emailHref} className="btn btn-outline-dark">
                Email Us
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              id="quote"
              className="scroll-mt-24 border border-navy/10 bg-white p-6 shadow-[0_40px_80px_-70px_rgba(20,37,45,0.8)] md:p-9"
            >
              <div className="mb-7 border-b border-navy/10 pb-5">
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-champagne">
                  Enquiries
                </span>
                <h2 className="mt-3 font-display text-[1.8rem] text-navy">
                  Send an Enquiry
                </h2>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-charcoal/60">
                  Prefer a dedicated quote form?{" "}
                  <Link
                    href="/residential#quote"
                    className="text-navy underline decoration-champagne/70 underline-offset-4"
                  >
                    Residential
                  </Link>{" "}
                  or{" "}
                  <Link
                    href="/commercial#quote"
                    className="text-navy underline decoration-champagne/70 underline-offset-4"
                  >
                    Commercial
                  </Link>
                  .
                </p>
              </div>
              <LeadForm
                variant="contact"
                sourcePage="/contact"
                submitLabel="Send Inquiry"
                note="Please avoid sharing sensitive access details in this form."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-navy/10 bg-white py-16 md:py-20">
        <div className="container-lux">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">Service Location</span>
              <h2 className="mt-5 font-display text-[2rem] leading-tight text-navy sm:text-[2.5rem]">
                Serving Mayfair &amp; Greater London.
              </h2>
              <p className="mt-4 max-w-xl text-[0.9rem] leading-relaxed text-charcoal/65">
                Our work is arranged by appointment across London. The map shows
                our primary service area — exact visit locations are confirmed
                with each client.
              </p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="link-underline shrink-0 text-navy"
            >
              Open in Google Maps <span aria-hidden="true">→</span>
            </a>
          </Reveal>

          <Reveal delay={100} className="mt-10 overflow-hidden border border-navy/10">
            <iframe
              title="Map of the Anthony & Co. service area in London"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[320px] w-full grayscale-[35%] md:h-[420px]"
            />
          </Reveal>
        </div>
      </section>

      {/* Note */}
      <section className="bg-navy py-14 text-ivory">
        <div className="container-lux flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="max-w-2xl font-display text-[1.6rem] leading-snug text-white sm:text-[1.9rem]">
            Every enquiry is read and answered personally by our team.
          </p>
          <a href={site.phoneHref} className="btn btn-gold shrink-0">
            {site.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}


