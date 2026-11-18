import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/reveal";
import { LineIcon, SectionHeading } from "@/components/ui";
import { images } from "@/lib/images";
import { serviceAreas, site } from "@/lib/site";
import { buildMetadata, serviceSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Premium Residential & Commercial Cleaning in London | Anthony & Co.",
  description:
    "Anthony & Co. provides premium residential and commercial cleaning across Mayfair and Greater London. Exceptional standards, meticulous detail, and a consistently pristine environment.",
  path: "/",
  keywords: [
    "premium residential cleaning London",
    "commercial cleaning services London",
    "professional house cleaning Mayfair",
  ],
});

const differentiators = [
  {
    icon: "detail",
    title: "Attention to Detail",
    copy: "Every space deserves careful attention. We focus on the details that make a noticeable difference.",
  },
  {
    icon: "standards",
    title: "Professional Standards",
    copy: "Reliable service delivered with professionalism, care, and respect for your property.",
  },
  {
    icon: "expertise",
    title: "Residential & Commercial Expertise",
    copy: "Flexible cleaning solutions for private homes and professional business environments.",
  },
  {
    icon: "quality",
    title: "Quality-Focused Service",
    copy: "Our commitment is to provide an exceptional cleaning experience from the first interaction to the finished result.",
  },
];

const steps = [
  {
    number: "01",
    title: "Tell Us What You Need",
    copy: "Share a few details about your property and cleaning requirements.",
  },
  {
    number: "02",
    title: "Receive Your Customised Quote",
    copy: "We will review your needs and provide a cleaning solution suited to your space.",
  },
  {
    number: "03",
    title: "Enjoy a Pristine Environment",
    copy: "Experience professional cleaning with attention to quality and detail.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceSchema({
              name: "Premium Residential Cleaning",
              description:
                "Professional residential cleaning for private homes, apartments and penthouses, maintained to an exceptional standard.",
              path: "/residential",
              offerings: [
                "Regular Home Cleaning",
                "Deep Cleaning",
                "Move-In / Move-Out Cleaning",
                "Customised Residential Cleaning",
              ],
            }),
            serviceSchema({
              name: "Commercial Cleaning",
              description:
                "Quality-focused commercial cleaning for offices, retail spaces and commercial properties across London.",
              path: "/commercial",
              offerings: [
                "Office Cleaning",
                "Retail & Showroom Cleaning",
                "Commercial Property Cleaning",
                "Customised Commercial Cleaning",
              ],
            }),
          ]),
        }}
      />

      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy text-white">
        <Image
          src={images.heroHome.src}
          alt={images.heroHome.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/20" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-navy-deep/90 via-navy/40 to-transparent" />

        <div className="container-lux relative z-10 pt-40 pb-14 md:pb-16 lg:pb-32">
          <span className="eyebrow animate-fade text-champagne-soft">
            Mayfair · Residential &amp; Commercial
          </span>
          <h1 className="animate-fade-up mt-8 max-w-4xl font-display text-[2.9rem] leading-[0.98] font-light sm:text-6xl lg:text-[5.2rem]">
            Exceptional Cleaning.
            <span className="block italic text-champagne-soft">
              Impeccable Standards.
            </span>
          </h1>
          <p className="animate-fade-up mt-8 max-w-xl text-[0.98rem] leading-relaxed text-white/75 md:text-lg">
            Premium residential and commercial cleaning services designed for
            those who expect exceptional quality, attention to detail, and a
            consistently pristine environment.
          </p>
          <div className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contact#quote" className="btn btn-gold">
              Request a Private Quote
            </Link>
            <Link href="#services" className="btn btn-outline-light">
              Explore Our Services
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-4">
            <span className="h-px w-10 bg-champagne/70" />
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.3em] text-white/60">
              Elevating the Standard of Cleanliness.
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 hidden border-t border-white/15 bg-navy-deep/40 backdrop-blur-sm lg:block">
          <div className="container-lux grid grid-cols-3 divide-x divide-white/10">
            {[
              ["Private Residences", "Apartments, townhouses & estates"],
              ["Corporate Workspaces", "Offices, showrooms & properties"],
              ["By Appointment", "Arranged around your schedule"],
            ].map(([title, detail]) => (
              <div key={title} className="px-6 py-5 first:pl-0 last:pr-0">
                <p className="text-[0.64rem] font-medium uppercase tracking-[0.22em] text-champagne-soft">
                  {title}
                </p>
                <p className="mt-1.5 text-[0.78rem] text-white/55">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand introduction */}
      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-[0.95fr_1fr] lg:gap-20 xl:gap-28">
          <Reveal className="relative">
            <div className="absolute -top-5 -left-5 hidden h-full w-full border border-champagne/35 lg:block" />
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={images.brandIntro.src}
                alt={images.brandIntro.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -right-4 -bottom-8 hidden max-w-[15rem] border border-champagne/40 bg-ivory px-7 py-6 shadow-[0_30px_60px_-50px_rgba(20,37,45,0.7)] lg:block">
              <p className="font-display text-[1.35rem] leading-snug text-navy">
                Detail is not a finishing touch. It is the standard.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <span className="eyebrow">The Anthony &amp; Co. Approach</span>
            <h2 className="mt-6 font-display text-[2.3rem] leading-[1.05] text-navy sm:text-[2.9rem] lg:text-[3.4rem]">
              A Higher Standard of Clean.
            </h2>
            <div className="mt-7 space-y-5 text-[0.975rem] leading-relaxed text-charcoal/70">
              <p>
                Cleanliness is more than appearance. It is about comfort,
                confidence, and the experience of being in a beautifully
                maintained space.
              </p>
              <p>
                We provide professional residential and commercial cleaning
                services with a commitment to quality, consistency, and
                attention to every detail.
              </p>
              <p>
                Whether maintaining a private residence or a professional
                business environment, our goal is to deliver an exceptional
                cleaning experience.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/about" className="link-underline text-navy">
                Discover Our Approach
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href={site.phoneHref}
                className="text-[0.75rem] font-medium uppercase tracking-[0.16em] text-charcoal/55 transition-colors hover:text-champagne"
              >
                {site.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Two service categories */}
      <section id="services" className="bg-white py-20 md:py-28 lg:py-32">
        <div className="container-lux">
          <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Our Services"
              title="Two Standards of Care. One Level of Excellence."
              description="Considered cleaning programmes for private residences and professional business environments, delivered with the same attention to detail."
            />
            <Link
              href="/contact#quote"
              className="link-underline shrink-0 text-navy"
            >
              Request a Quote <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {[
              {
                image: images.residentialCard,
                label: "Residential",
                title: "Residential Cleaning",
                copy: "Enjoy the comfort of a beautifully maintained home. Our residential cleaning services focus on cleanliness, presentation, and the details that make your space feel exceptional.",
                href: "/residential",
                cta: "Explore Residential Services",
              },
              {
                image: images.commercialCard,
                label: "Commercial",
                title: "Commercial Cleaning",
                copy: "Create a cleaner, more welcoming business environment. Professional cleaning solutions designed to support businesses, employees, clients, and visitors.",
                href: "/commercial",
                cta: "Explore Commercial Services",
              },
            ].map((card, index) => (
              <Reveal
                key={card.title}
                delay={index * 120}
                as="article"
                className="group relative min-h-[26rem] overflow-hidden bg-navy md:min-h-[32rem]"
              >
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/5" />
                <div className="relative flex h-full min-h-[26rem] flex-col justify-end p-8 md:min-h-[32rem] md:p-10">
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.3em] text-champagne-soft">
                    {card.label}
                  </span>
                  <h3 className="mt-3 font-display text-3xl text-white md:text-[2.5rem]">
                    {card.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
                    {card.copy}
                  </p>
                  <Link
                    href={card.href}
                    className="mt-7 inline-flex items-center gap-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:text-champagne-soft"
                  >
                    {card.cta}
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

      {/* Why choose us */}
      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="container-lux">
          <Reveal className="grid gap-8 md:grid-cols-[1fr_0.85fr] md:items-end">
            <SectionHeading
              eyebrow="Why Choose Anthony &amp; Co."
              title="The Difference Is in the Details."
            />
            <p className="text-[0.95rem] leading-relaxed text-charcoal/65 md:pb-2">
              A cleaning service should feel considered from the first
              conversation to the final room. These are the principles behind
              every visit.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 90}
                className="bg-ivory p-8 transition-colors duration-500 hover:bg-white md:p-10"
              >
                <LineIcon name={item.icon} className="h-9 w-9 text-champagne" />
                <h3 className="mt-7 font-display text-[1.55rem] leading-tight text-navy">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-[0.875rem] leading-relaxed text-charcoal/65">
                  {item.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-stone/60 py-20 md:py-28 lg:py-32">
        <div className="container-lux">
          <Reveal>
            <SectionHeading
              eyebrow="Our Cleaning Process"
              title="Simple. Professional. Seamless."
              description="Three considered steps, from your first enquiry to a beautifully maintained space."
              align="center"
            />
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 120} className="relative">
                <div className="flex items-baseline justify-between border-t border-navy/15 pt-6">
                  <span className="font-display text-4xl text-champagne">
                    {step.number}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-champagne" />
                </div>
                <h3 className="mt-7 font-display text-[1.7rem] leading-tight text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-charcoal/65">
                  {step.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle banner */}
      <section className="relative flex min-h-[32rem] items-center justify-center overflow-hidden bg-navy py-24 text-center text-white md:min-h-[38rem]">
        <Image
          src={images.lifestyleBanner.src}
          alt={images.lifestyleBanner.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="container-lux relative z-10">
          <Reveal className="mx-auto max-w-2xl">
            <span className="eyebrow eyebrow-plain text-champagne-soft">
              The Anthony &amp; Co. Experience
            </span>
            <h2 className="mt-6 font-display text-[2.6rem] leading-[1.03] text-white sm:text-[3.4rem]">
              Come Home to Exceptional.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[0.975rem] leading-relaxed text-white/75">
              Discover the difference a professionally maintained space can
              make.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact#quote" className="btn btn-gold">
                Request Your Cleaning Quote
              </Link>
              <Link href="/residential" className="btn btn-outline-light">
                Residential Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust & professionalism */}
      <section className="bg-white py-20 md:py-28 lg:py-32">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow">Trust &amp; Professionalism</span>
            <h2 className="mt-6 font-display text-[2.3rem] leading-[1.05] text-navy sm:text-[2.9rem] lg:text-[3.3rem]">
              Your Property Deserves Professional Care.
            </h2>
            <p className="mt-7 text-[0.975rem] leading-relaxed text-charcoal/70">
              We understand that inviting a cleaning team into your home or
              business requires confidence and trust. Our approach is built
              around professionalism, respect for your space, clear
              communication, and attention to detail.
            </p>

            <ul className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {[
                "Clear, considered communication",
                "Respect for your space and routine",
                "Consistent standards on every visit",
                "Discreet, professional teams",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="mt-1 h-3.5 w-3.5 shrink-0 stroke-champagne"
                    fill="none"
                    strokeWidth="1.3"
                  >
                    <path d="m2 8.5 4 4L14 3.5" />
                  </svg>
                  <span className="text-[0.875rem] leading-relaxed text-charcoal/70">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-l border-champagne/50 pl-6">
              <p className="font-display text-xl leading-snug text-navy/85 italic">
                “Every home and business deserves a higher standard of
                cleanliness.”
              </p>
              <p className="mt-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-charcoal/45">
                The Anthony &amp; Co. Team
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={images.trustProfessional.src}
                alt={images.trustProfessional.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden h-28 w-28 border-l border-b border-champagne/50 lg:block" />
          </Reveal>
        </div>
      </section>

      {/* Service area */}
      <section className="border-y border-navy/10 bg-ivory py-14">
        <div className="container-lux flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="eyebrow">Service Area</span>
            <p className="mt-4 max-w-xl font-display text-[1.6rem] leading-snug text-navy">
              Serving London&apos;s finest residences and workspaces.
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {serviceAreas.map((area) => (
              <li
                key={area}
                className="flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-charcoal/60"
              >
                <span className="h-1 w-1 rounded-full bg-champagne" />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-navy py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(185,154,104,0.18),transparent_55%)]" />
        <div className="absolute top-8 left-8 hidden h-16 w-16 border-t border-l border-champagne/30 md:block" />
        <div className="absolute right-8 bottom-8 hidden h-16 w-16 border-r border-b border-champagne/30 md:block" />
        <div className="container-lux relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-champagne-soft">Begin the Conversation</span>
            <h2 className="mt-6 font-display text-[2.4rem] leading-[1.03] text-white sm:text-[3.1rem]">
              Ready for a Higher Standard of Clean?
            </h2>
            <p className="mt-5 text-[0.975rem] leading-relaxed text-white/65">
              Tell us about your home or business, and let us help you find the
              right cleaning solution.
            </p>
          </Reveal>
          <Reveal delay={120} className="w-full lg:w-auto">
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link href="/contact#quote" className="btn btn-gold">
                Request a Free Quote
              </Link>
              <a href={site.phoneHref} className="btn btn-outline-light">
                {site.phoneDisplay}
              </a>
            </div>
            <p className="mt-5 text-[0.65rem] uppercase tracking-[0.2em] text-white/40 lg:text-right">
              Residential &amp; Commercial · {site.serviceAreaShort}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
