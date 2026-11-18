import Link from "next/link";
import LeadForm from "@/components/lead-form";
import Reveal from "@/components/reveal";
import { site } from "@/lib/site";

type Variant = "residential" | "commercial" | "contact";

const copy: Record<
  Variant,
  {
    eyebrow: string;
    title: string;
    description: string;
    submitLabel: string;
    formTitle: string;
    steps: string[];
    note: string;
  }
> = {
  residential: {
    eyebrow: "Residential Enquiry",
    title: "Request Your Residential Quote.",
    description:
      "Share a few details about your home and how you would like it maintained. We will respond personally with a considered recommendation and a clear quote.",
    submitLabel: "Request My Residential Quote",
    formTitle: "Residential Cleaning Enquiry",
    steps: [
      "We review the details of your property and priorities.",
      "We respond with a tailored recommendation and quote.",
      "We arrange your first visit at a time that suits you.",
    ],
    note: "No obligation. Your details stay private and are used only to prepare your quote.",
  },
  commercial: {
    eyebrow: "Commercial Enquiry",
    title: "Request a Commercial Proposal.",
    description:
      "Tell us about your premises, operating hours and presentation standards. We will prepare a proposal suited to your business.",
    submitLabel: "Request a Commercial Proposal",
    formTitle: "Commercial Cleaning Enquiry",
    steps: [
      "We review your premises, requirements and schedule.",
      "We prepare a scope and proposal for your operation.",
      "We agree a service arrangement that works for your team.",
    ],
    note: "No obligation. Your details are used solely to prepare your proposal.",
  },
  contact: {
    eyebrow: "Enquiries",
    title: "Send Us an Enquiry.",
    description:
      "Whether your enquiry is for a private residence or a commercial space, tell us a little about it and we will respond personally.",
    submitLabel: "Send Inquiry",
    formTitle: "General Enquiry",
    steps: [
      "We read every enquiry personally.",
      "We respond with the right next step for your space.",
      "We arrange a convenient time to discuss further.",
    ],
    note: "Please avoid sharing sensitive access details in this form.",
  },
};

export default function QuoteSection({
  variant,
  sourcePage,
}: {
  variant: Variant;
  sourcePage: string;
}) {
  const content = copy[variant];

  return (
    <section
      id="quote"
      className="scroll-mt-24 border-t border-navy/10 bg-stone/50 py-20 md:py-28"
    >
      <div className="container-lux grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 className="mt-6 font-display text-[2.2rem] leading-[1.05] text-navy sm:text-[2.7rem]">
            {content.title}
          </h2>
          <p className="mt-6 text-[0.95rem] leading-relaxed text-charcoal/70">
            {content.description}
          </p>

          <ol className="mt-9 space-y-5 border-t border-navy/15 pt-8">
            {content.steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="font-display text-lg text-champagne">
                  0{index + 1}
                </span>
                <span className="text-[0.875rem] leading-relaxed text-charcoal/70">
                  {step}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-9 space-y-4 border-t border-navy/15 pt-8">
            <div>
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-charcoal/45">
                Prefer to speak with us
              </p>
              <a
                href={site.phoneHref}
                className="mt-2 block font-display text-2xl text-navy transition-colors hover:text-champagne"
              >
                {site.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-charcoal/45">
                By email
              </p>
              <a
                href={site.emailHref}
                className="mt-2 block text-sm break-all text-charcoal/75 transition-colors hover:text-champagne"
              >
                {site.email}
              </a>
            </div>
            <p className="text-[0.78rem] leading-relaxed text-charcoal/55">
              Serving {site.serviceArea}. Appointments arranged around your
              schedule.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="border border-navy/10 bg-white p-6 shadow-[0_40px_80px_-70px_rgba(20,37,45,0.8)] md:p-9">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-5">
              <h3 className="font-display text-[1.6rem] text-navy">
                {content.formTitle}
              </h3>
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-champagne">
                Private &amp; Confidential
              </span>
            </div>
            <LeadForm
              variant={variant}
              sourcePage={sourcePage}
              submitLabel={content.submitLabel}
              note={content.note}
            />
          </div>
          {variant !== "contact" && (
            <p className="mt-5 text-[0.75rem] text-charcoal/55">
              Looking for the other service?{" "}
              <Link
                href={variant === "residential" ? "/commercial" : "/residential"}
                className="text-navy underline decoration-champagne/70 underline-offset-4 transition-colors hover:text-champagne"
              >
                {variant === "residential"
                  ? "Request a commercial proposal"
                  : "Request a residential quote"}
              </Link>
              .
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
