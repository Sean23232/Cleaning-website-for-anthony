import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/reveal";
import { JsonLd, PageHero, SectionHeading } from "@/components/ui";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us | A Premium Cleaning Company in London",
  description:
    "Anthony & Co. is a premium residential and commercial cleaning company serving London. Discover our approach to quality, professionalism and respect for every property.",
  path: "/about",
  keywords: [
    "premium cleaning company London",
    "professional cleaning team Mayfair",
    "residential and commercial cleaning London",
  ],
});

const values = [
  {
    number: "01",
    title: "Quality in Every Detail",
    copy: "We judge our work by the details — the edges, the finishes, the surfaces most people overlook.",
  },
  {
    number: "02",
    title: "Professionalism at Every Step",
    copy: "From the first enquiry to the finished room, we communicate clearly and arrive prepared.",
  },
  {
    number: "03",
    title: "Respect for Every Property",
    copy: "Your home or business is treated with care, discretion and consideration throughout our visit.",
  },
  {
    number: "04",
    title: "Customer-Focused Service",
    copy: "We listen first, agree the scope together and adapt as your requirements change.",
  },
  {
    number: "05",
    title: "Consistency and Care",
    copy: "Standards should not vary visit to visit. We work to the same considered approach each time.",
  },
];

const approach = [
  {
    title: "We listen first",
    copy: "Tell us about your property, your priorities and the way you would like it maintained. No assumptions, no templates.",
  },
  {
    title: "We agree the detail",
    copy: "Before any visit, the scope is confirmed: the spaces covered, the frequency, access and anything that needs particular care.",
  },
  {
    title: "We deliver consistently",
    copy: "The same considered standard on every visit, with clear communication if anything needs your attention.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />

      <PageHero
        eyebrow="About Anthony & Co."
        title={
          <>
            Built Around Quality.
            <span className="block italic text-champagne-soft">
              Driven by Professionalism.
            </span>
          </>
        }
        description="We believe every home and business deserves a higher standard of cleanliness."
        image={images.aboutHero}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        primary={{ label: "Request a Quote", href: "/contact#quote" }}
        secondary={{ label: "Our Values", href: "#values" }}
      />

      {/* Introduction */}
      <section className="bg-ivory py-20 md:py-28 lg:py-32">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-[0.95fr_1fr] lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={images.aboutTeam.src}
                alt={images.aboutTeam.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -right-4 -bottom-4 hidden border border-champagne/40 bg-ivory px-6 py-5 lg:block">
              <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-champagne">
                Our Standard
              </p>
              <p className="mt-2 max-w-[13rem] font-display text-lg leading-snug text-navy">
                Considered cleaning, delivered with care.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <span className="eyebrow">Our Philosophy</span>
            <h2 className="mt-6 font-display text-[2.3rem] leading-[1.05] text-navy sm:text-[2.8rem] lg:text-[3.2rem]">
              A higher standard, for every space we care for.
            </h2>
            <div className="mt-7 space-y-5 text-[0.975rem] leading-relaxed text-charcoal/70">
              <p>
                We believe every home and business deserves a higher standard of
                cleanliness.
              </p>
              <p>
                Our focus is on delivering professional residential and
                commercial cleaning services with care, consistency, and
                attention to detail.
              </p>
              <p>
                We understand that every property is different. That is why we
                believe in understanding each customer&apos;s requirements and
                providing a cleaning solution that meets their expectations.
              </p>
              <p>
                Our goal is simple: to make every space we care for feel cleaner,
                fresher, and more welcoming.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/residential" className="btn btn-outline-dark">
                Residential Cleaning
              </Link>
              <Link href="/commercial" className="btn btn-outline-dark">
                Commercial Cleaning
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section
        id="values"
        className="scroll-mt-24 border-y border-navy/10 bg-white py-20 md:py-28"
      >
        <div className="container-lux">
          <Reveal>
            <SectionHeading
              eyebrow="Our Values"
              title="The principles behind every visit."
              description="Five commitments that shape how we work with private homeowners, businesses and property managers."
              align="center"
            />
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * 70}
                className="flex flex-col bg-ivory p-7 transition-colors duration-500 hover:bg-stone/50"
              >
                <span className="font-display text-3xl text-champagne">
                  {value.number}
                </span>
                <h3 className="mt-8 font-display text-[1.35rem] leading-tight text-navy">
                  {value.title}
                </h3>
                <p className="mt-3 text-[0.83rem] leading-relaxed text-charcoal/65">
                  {value.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-ivory py-20 md:py-28">
        <div className="container-lux grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow">Our Approach</span>
            <h2 className="mt-6 font-display text-[2.2rem] leading-[1.06] text-navy sm:text-[2.7rem]">
              Understood, agreed, then delivered beautifully.
            </h2>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-charcoal/70">
              We keep the process straightforward and personal. You will always
              know who you are speaking with, what has been agreed and what to
              expect from each visit.
            </p>

            <ol className="mt-9 divide-y divide-navy/10 border-y border-navy/10">
              {approach.map((item, index) => (
                <li key={item.title} className="flex gap-5 py-6">
                  <span className="font-display text-lg text-champagne">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.3rem] text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-charcoal/65">
                      {item.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={images.aboutDetail.src}
                alt={images.aboutDetail.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="border border-champagne/35 bg-white p-7 md:p-8">
              <p className="font-display text-[1.5rem] leading-snug text-navy italic">
                “Every home and business deserves a higher standard of
                cleanliness.”
              </p>
              <p className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-charcoal/45">
                The Anthony &amp; Co. Team
              </p>
              <p className="mt-5 text-[0.8rem] leading-relaxed text-charcoal/60">
                Serving {site.serviceArea}. For a personal conversation about
                your property, call {site.phoneDisplay}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy py-20 text-white md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(185,154,104,0.2),transparent_55%)]" />
        <div className="container-lux relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <Reveal>
            <span className="eyebrow text-champagne-soft">Work With Us</span>
            <h2 className="mt-6 font-display text-[2.3rem] leading-[1.04] text-white sm:text-[3rem]">
              Let us care for your space.
            </h2>
            <p className="mt-5 max-w-xl text-[0.975rem] leading-relaxed text-white/65">
              Share a few details about your home or business and we will respond
              personally with the right next step.
            </p>
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/residential#quote" className="btn btn-gold">
              Residential Quote
            </Link>
            <Link href="/commercial#quote" className="btn btn-outline-light">
              Commercial Proposal
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
