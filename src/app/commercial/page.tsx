import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/faq";
import QuoteSection from "@/components/quote-section";
import Reveal from "@/components/reveal";
import { JsonLd, LineIcon, PageHero, SectionHeading } from "@/components/ui";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Commercial Cleaning in London | Office & Workspace Cleaning",
  description:
    "Quality-focused commercial cleaning for London offices, retail spaces and commercial properties. Reliable service that keeps your business environment clean, professional and welcoming.",
  path: "/commercial",
  keywords: [
    "commercial cleaning services London",
    "office cleaning services London",
    "retail cleaning London",
    "commercial property cleaning Mayfair",
  ],
});

const solutions = [
  {
    number: "01",
    title: "Office Cleaning",
    image: images.commercialDesks,
    points: [
      "Workstation and desk cleaning",
      "Common-area maintenance",
      "Meeting-room cleaning",
      "General office upkeep",
    ],
  },
  {
    number: "02",
    title: "Retail & Showroom Cleaning",
    image: images.retailShowroom,
    points: [
      "Clean, customer-facing spaces",
      "Floor and surface maintenance",
      "Attention to presentation",
      "Considered finishing before opening",
    ],
  },
  {
    number: "03",
    title: "Commercial Property Cleaning",
    image: images.commercialLobby,
    points: [
      "Cleaning for business premises",
      "Shared-area maintenance",
      "General property upkeep",
      "Reception and entrance presentation",
    ],
  },
  {
    number: "04",
    title: "Customised Commercial Cleaning",
    image: images.officeGlass,
    points: [
      "Solutions based on property size",
      "Requirements tailored to the business",
      "Arrangements based on operational needs",
      "Scope agreed and documented in advance",
    ],
  },
];

const commitments = [
  {
    icon: "clock",
    title: "Your Operating Hours",
    copy: "Cleaning arrangements can be planned around the way your business runs, including before opening or after close.",
  },
  {
    icon: "standards",
    title: "Consistent Standards",
    copy: "A defined scope and consistent approach, so your premises look and feel the same standard every visit.",
  },
  {
    icon: "shield",
    title: "Respect for Your Premises",
    copy: "Careful, methodical work with attention to the spaces your team and clients rely on.",
  },
];

const faqs = [
  {
    question: "How do you scope a commercial cleaning service?",
    answer:
      "We begin with the details of your premises: property type, approximate size, operating hours and the standard you need to maintain. From there we prepare a proposal covering the areas, tasks and frequency of the service.",
  },
  {
    question: "Can cleaning be carried out outside business hours?",
    answer:
      "Yes. Many commercial clients prefer cleaning before opening or after close. Share your preferred hours in the enquiry form and we will consider them when preparing your proposal.",
  },
  {
    question: "Do you work with property managers and multi-site businesses?",
    answer:
      "We welcome enquiries from property owners, managers and businesses responsible for more than one location. Tell us about the properties involved and we will discuss a suitable arrangement.",
  },
  {
    question: "Can the service change as our business needs change?",
    answer:
      "Yes. Cleaning requirements often evolve, whether through a change of layout, an increase in visitors, or a new presentation standard. We review the arrangement with you and adjust the scope accordingly.",
  },
];

const sectors = [
  "Corporate offices",
  "Retail & showrooms",
  "Professional services",
  "Clinics & practices",
  "Hospitality spaces",
  "Commercial properties",
];

export default function CommercialPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Commercial Cleaning", path: "/commercial" },
          ]),
          serviceSchema({
            name: "Commercial Cleaning",
            description:
              "Professional commercial cleaning for offices, retail and showroom spaces, and commercial properties across London.",
            path: "/commercial",
            offerings: solutions.map((solution) => solution.title),
          }),
        ]}
      />

      <PageHero
        eyebrow="Commercial Cleaning"
        title={
          <>
            Professional Cleaning for
            <span className="block italic text-champagne-soft">
              Exceptional Workspaces.
            </span>
          </>
        }
        description="Reliable, quality-focused commercial cleaning solutions that help businesses maintain clean, professional, and welcoming environments."
        image={images.commercialHero}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Commercial Cleaning" },
        ]}
        primary={{ label: "Request a Commercial Quote", href: "#quote" }}
        secondary={{ label: "View Commercial Solutions", href: "#solutions" }}
      />

      {/* Introduction */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow">For Business Environments</span>
            <h2 className="mt-6 font-display text-[2.2rem] leading-[1.06] text-navy sm:text-[2.7rem] lg:text-[3rem]">
              Cleaning built around your operation.
            </h2>
            <p className="mt-7 text-[0.975rem] leading-relaxed text-charcoal/70">
              A clean business environment is part of the experience you offer.
              It shapes how clients feel on arrival, how your team works, and
              how your premises are remembered. Our commercial cleaning is
              scoped around your space, your schedule and the standard you set.
            </p>
            <p className="mt-4 text-[0.975rem] leading-relaxed text-charcoal/70">
              We begin with a conversation, agree the details in advance, and
              deliver a consistent service that supports your business rather
              than interrupting it.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#quote" className="btn btn-gold">
                Request a Commercial Proposal
              </Link>
              <a href={site.phoneHref} className="btn btn-outline-dark">
                Call {site.phoneDisplay}
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-[5/4] w-full overflow-hidden">
              <Image
                src={images.commercialWorkspace.src}
                alt={images.commercialWorkspace.alt}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden border border-champagne/40 bg-white px-6 py-5 lg:block">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-champagne">
                Commercial Enquiries
              </p>
              <p className="mt-2 font-display text-lg text-navy">
                Proposals prepared personally
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Solutions */}
      <section
        id="solutions"
        className="scroll-mt-24 border-y border-navy/10 bg-ivory py-20 md:py-28"
      >
        <div className="container-lux">
          <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Commercial Cleaning Solutions"
              title="A standard of clean your business can rely on."
              description="Four core areas of support for commercial premises. Each service is confirmed with you in detail before we begin."
            />
            <Link href="#quote" className="link-underline shrink-0 text-navy">
              Request a Proposal <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
            {solutions.map((solution, index) => (
              <Reveal
                key={solution.title}
                as="article"
                delay={index * 90}
                className="group flex flex-col border border-navy/10 bg-white"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={solution.image.src}
                    alt={solution.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/45 to-transparent" />
                  <span className="absolute top-4 left-4 border border-white/40 bg-navy/40 px-3 py-1 text-[0.62rem] font-medium tracking-[0.2em] text-white backdrop-blur-sm">
                    {solution.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <h3 className="font-display text-[1.7rem] leading-tight text-navy">
                    {solution.title}
                  </h3>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {solution.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-2.5 h-px w-3 shrink-0 bg-champagne" />
                        <span className="text-[0.875rem] leading-relaxed text-charcoal/70">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#quote"
                    className="mt-6 inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-navy transition-colors hover:text-champagne"
                  >
                    Discuss this service
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* First impressions */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <span className="eyebrow">Your Business. Our Standard of Clean.</span>
            <h2 className="mt-6 font-display text-[2.3rem] leading-[1.05] text-navy sm:text-[2.9rem] lg:text-[3.2rem]">
              Make Every First Impression Count.
            </h2>
            <p className="mt-7 text-[0.975rem] leading-relaxed text-charcoal/70">
              A clean business environment reflects professionalism. We help
              businesses maintain spaces that employees, customers, and visitors
              can feel confident walking into.
            </p>
            <div className="mt-9 grid gap-6 sm:grid-cols-3">
              {commitments.map((item) => (
                <div key={item.title} className="border-t border-navy/15 pt-4">
                  <LineIcon name={item.icon} className="h-7 w-7 text-champagne" />
                  <p className="mt-4 text-[0.8rem] font-medium uppercase tracking-[0.12em] text-navy">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-charcoal/60">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="order-1 lg:order-2">
            <div className="relative aspect-[5/6] w-full overflow-hidden">
              <Image
                src={images.commercialCard.src}
                alt={images.commercialCard.alt}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-stone/60 py-16 md:py-20">
        <div className="container-lux grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">Sectors We Support</span>
            <h2 className="mt-5 font-display text-[2rem] leading-tight text-navy sm:text-[2.5rem]">
              Discreet, professional service across commercial settings.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <ul className="grid grid-cols-2 gap-px overflow-hidden border border-navy/10 bg-navy/10 sm:grid-cols-3">
              {sectors.map((sector) => (
                <li
                  key={sector}
                  className="bg-ivory px-5 py-6 text-[0.8rem] leading-snug text-charcoal/70"
                >
                  {sector}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Faq
        items={faqs}
        title="Questions about commercial cleaning."
        description="Practical points for office managers, business owners and property managers considering a cleaning partner."
      />

      <QuoteSection variant="commercial" sourcePage="/commercial" />

      {/* Cross-sell */}
      <section className="bg-navy py-16 text-ivory">
        <div className="container-lux flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <span className="eyebrow text-champagne-soft">Private Residences</span>
            <p className="mt-4 max-w-xl font-display text-[1.9rem] leading-snug text-white">
              We also care for private homes across London.
            </p>
          </div>
          <Link href="/residential" className="btn btn-outline-light shrink-0">
            Explore Residential Cleaning
          </Link>
        </div>
      </section>
    </>
  );
}
