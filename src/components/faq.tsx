import Reveal from "@/components/reveal";
import { SectionHeading } from "@/components/ui";

export default function Faq({
  items,
  eyebrow = "Good to Know",
  title,
  description,
}: {
  items: { question: string; answer: string }[];
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-ivory py-20 md:py-28">
      <div className="container-lux grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>
        <Reveal delay={100}>
          <div className="divide-y divide-navy/10 border-y border-navy/10">
            {items.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[1.35rem] leading-snug text-navy marker:hidden">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center border border-navy/20 text-champagne transition-transform duration-300 group-open:rotate-45"
                  >
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 stroke-current">
                      <path d="M6 1v10M1 6h10" fill="none" strokeWidth="1.1" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl pr-10 text-[0.9rem] leading-relaxed text-charcoal/65">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
