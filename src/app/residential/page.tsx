import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/faq";
import QuoteSection from "@/components/quote-section";
import Reveal from "@/components/reveal";
import { JsonLd, LineIcon, PageHero, SectionHeading } from "@/components/ui";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import {
  breadcrumbSchema,
  buildMetadata,
  serviceSchema,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Residential Cleaning in London | Luxury Home Cleaning",
  description:
    "Professional residential cleaning for London homes, apartments and penthouses. Regular cleaning, deep cleaning and move-in / move-out cleaning, tailored to your property and routine.",
  path: "/residential",
  keywords: [
    "premium residential cleaning London",
    "professional house cleaning Mayfair",
    "luxury home cleaning London",
    "deep cleaning Kensington",
    "move out cleaning Chelsea",
  ],
});

const residentialServices = [
  {
    number: "01",
    title: "Regular Home Cleaning",
    image: images.livingDetail,
    points: [
      "Routine cleaning and upkeep",
      "Dusting and surface cleaning",
      "Kitchen and bathroom maintenance",
      "General living-area cleaning",
    ],
  },
  {
    number: "02",
    title: "Deep Cleaning",
    image: images.residentialBathroom,
    points: [
      "Detailed cleaning of kitchens and bathrooms",
      "Attention to hard-to-reach areas",
      "Detailed surface and floor cleaning",
      "A thorough reset for your home",
    ],
  },
  {
    number: "03",
    title: "Move-In / Move-Out Cleaning",
    image: images.apartmentDetail,
    points: [
      "Detailed cleaning before moving into a property",
      "Cleaning after a property has been vacated",
      "Preparation for new occupants",
      "Considered presentation of every room",
    ],
  },
  {
    number: "04",
    title: "Customised Residential Cleaning",
    image: images.kitchenDetail,
    points: [
      "Cleaning tailored to individual property requirements",
      "Flexible cleaning arrangements",
      "Priority areas agreed with you",
      "A programme that fits your routine",
    ],
  },
];

const rooms = [
  {
    icon: "detail",
    title: "Kitchens & Pantries",
    copy: "Worktops, cabinetry fronts, sinks and appliance exteriors cleaned and polished.",
  },
  {
    icon: "standards",
    title: "Bathrooms & Dressing Rooms",
    copy: "Detailed attention to fixtures, glass, mirrors and high-touch surfaces.",
  },
  {
    icon: "expertise",
    title: "Living & Dining Spaces",
    copy: "Dust-free surfaces, considered presentation and floors finished with care.",
  },
  {
    icon: "quality",
    title: "Bedrooms & Linens",
    copy: "Beds presented neatly, surfaces refreshed and rooms left beautifully calm.",
  },
];

const faqs = [
  {
    question: "How do I arrange a residential cleaning service?",
    answer:
      "Send us the details of your property and the cleaning you would like. We will review your requirements, respond with a tailored recommendation and quote, and arrange your first visit at a time that suits your household.",
  },
  {
    question: "Can the cleaning be tailored to my priorities?",
    answer:
      "Yes. Every home is different, so we agree the scope with you in advance. You can tell us which rooms or areas matter most, how often you would like us to attend, and any preferences we should follow.",
  },
  {
    question: "Do I need to be at home during the clean?",
    answer:
      "It is entirely your choice. Many clients prefer to be present for the first visit and then arrange access for subsequent appointments. We will confirm access arrangements with you before each visit.",
  },
  {
    question: "Can you clean before I move in or after I move out?",
    answer:
      "Yes. Move-in and move-out cleaning is available for properties that are empty or about to change hands, with a thorough focus on kitchens, bathrooms, floors and interior presentation.",
  },
];

export default function ResidentialPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Residential Cleaning", path: "/residential" },
          ]),
          serviceSchema({
            name: "Residential Cleaning",
            description:
              "Premium residential cleaning for London homes, including regular cleaning, deep cleaning, and move-in / move-out cleaning.",
            path: "/residential",
            offerings: residentialServices.map((service) => service.title),
          }),
        ]}
      />

      <PageHero
        eyebrow="Residential Cleaning"
        title={
          <>
            Luxury Home Cleaning,
            <span className="block italic text-champagne-soft">
              Without Compromise.
            </span>
          </>
        }
        description="Professional residential cleaning services designed to keep your home fresh, immaculate, and beautifully maintained."
        image={images.residentialHero}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Residential Cleaning" },
        ]}
        primary={{ label: "Request a Residential Quote", href: "#quote" }}
        secondary={{ label: "View Cleaning Services", href: "#services" }}
      />

      {/* Introduction */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow">For Private Residences</span>
            <h2 className="mt-6 font-display text-[2.2rem] leading-[1.06] text-navy sm:text-[2.7rem] lg:text-[3rem]">
              Cleaning that respects the way you live.
            </h2>
            <p className="mt-7 text-[0.975rem] leading-relaxed text-charcoal/70">
              Your home is a private space, and it should feel exceptional to
              return to. Our residential cleaning is considered, discreet and
              tailored to the way your household actually lives — from the
              finishes in your kitchen to the way linens are presented in each
              bedroom.
            </p>
            <p className="mt-4 text-[0.975rem] leading-relaxed text-charcoal/70">
              We agree the scope with you in advance, work to consistent
              standards, and pay attention to the details that make a home feel
              genuinely cared for.
            </p>
            <div className="mt-9 grid gap-5 sm:grid-cols-3">
              {[
                ["Private homes", "Houses, apartments & penthouses"],
                ["Flexible", "Arrangements built around you"],
                ["Detail-led", "Every room considered"],
              ].map(([title, detail]) => (
                <div key={title} className="border-t border-navy/15 pt-4">
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-navy">
                    {title}
                  </p>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-charcoal/55">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-[5/6] w-full overflow-hidden">
              <Image
                src={images.residentialIntro.src}
                alt={images.residentialIntro.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden border border-champagne/40 bg-ivory px-6 py-5 lg:block">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-champagne">
                By Appointment
              </p>
              <p className="mt-2 font-display text-lg text-navy">
                Arranged around your schedule
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="scroll-mt-24 border-y border-navy/10 bg-white py-20 md:py-28"
      >
        <div className="container-lux">
          <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Residential Cleaning Services"
              title="Considered cleaning, tailored to your home."
              description="A selection of residential cleaning services. We confirm the exact scope with you before any visit, so you know precisely what to expect."
            />
            <Link href="#quote" className="link-underline shrink-0 text-navy">
              Request a Quote <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
            {residentialServices.map((service, index) => (
              <Reveal
                key={service.title}
                as="article"
                delay={index * 90}
                className="group flex flex-col border border-navy/10 bg-ivory"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                  <span className="absolute top-4 left-4 border border-white/40 bg-navy/40 px-3 py-1 text-[0.62rem] font-medium tracking-[0.2em] text-white backdrop-blur-sm">
                    {service.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <h3 className="font-display text-[1.7rem] leading-tight text-navy">
                    {service.title}
                  </h3>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {service.points.map((point) => (
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
                    Enquire about this service
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

      {/* Lifestyle */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <span className="eyebrow">A Beautifully Maintained Home</span>
            <h2 className="mt-6 font-display text-[2.3rem] leading-[1.05] text-navy sm:text-[2.9rem] lg:text-[3.2rem]">
              More Time for What Matters.
            </h2>
            <p className="mt-7 text-[0.975rem] leading-relaxed text-charcoal/70">
              Let professional cleaning take care of the details while you enjoy
              the comfort of a beautifully maintained home.
            </p>
            <p className="mt-4 text-[0.975rem] leading-relaxed text-charcoal/70">
              From the kitchen you use every morning to the guest room prepared
              for visitors, each space is considered, refreshed and returned to
              you beautifully presented.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#quote" className="btn btn-gold">
                Request a Residential Quote
              </Link>
              <a href={site.phoneHref} className="btn btn-outline-dark">
                Call {site.phoneDisplay}
              </a>
            </div>
          </Reveal>

          <Reveal delay={100} className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[5/4]">
              <Image
                src={images.livingWide.src}
                alt={images.livingWide.alt}
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Room-by-room care */}
      <section className="bg-stone/60 py-20 md:py-24">
        <div className="container-lux">
          <Reveal>
            <SectionHeading
              eyebrow="Detail by Detail"
              title="Every room, considered."
              description="A considered approach to the spaces you use most, with the finishing touches that make a home feel beautifully maintained."
              align="center"
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((room, index) => (
              <Reveal
                key={room.title}
                delay={index * 80}
                className="bg-ivory p-7 lg:p-8"
              >
                <LineIcon name={room.icon} className="h-8 w-8 text-champagne" />
                <h3 className="mt-6 font-display text-[1.4rem] leading-tight text-navy">
                  {room.title}
                </h3>
                <p className="mt-3 text-[0.85rem] leading-relaxed text-charcoal/65">
                  {room.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Faq
        items={faqs}
        title="Questions about residential cleaning."
        description="A few practical answers before you begin. If your question is not covered here, we are always happy to talk it through."
      />

      <QuoteSection variant="residential" sourcePage="/residential" />

      {/* Cross-sell */}
      <section className="bg-navy py-16 text-ivory">
        <div className="container-lux flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <span className="eyebrow text-champagne-soft">Commercial Clients</span>
            <p className="mt-4 max-w-xl font-display text-[1.9rem] leading-snug text-white">
              We also care for offices, showrooms and commercial properties.
            </p>
          </div>
          <Link href="/commercial" className="btn btn-outline-light shrink-0">
            Explore Commercial Cleaning
          </Link>
        </div>
      </section>
    </>
  );
}
