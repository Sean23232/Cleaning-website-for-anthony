import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/lib/images";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  primary,
  secondary,
  breadcrumb,
  align = "left",
  size = "default",
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: ImageAsset;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  breadcrumb?: { label: string; href?: string }[];
  align?: "left" | "center";
  size?: "default" | "compact";
}) {
  return (
    <section
      className={`relative flex items-end overflow-hidden bg-navy text-white ${
        size === "compact"
          ? "min-h-[64svh] pt-32 pb-16 md:min-h-[60svh] md:pb-20"
          : "min-h-[78svh] pt-36 pb-16 md:min-h-[82svh] md:pb-24"
      }`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/92 via-navy/70 to-navy/25" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/80 to-transparent" />

      <div className="container-lux relative z-10">
        <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
          {breadcrumb && (
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.2em] text-white/55"
            >
              {breadcrumb.map((crumb, index) => (
                <span key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/85">{crumb.label}</span>
                  )}
                  {index < breadcrumb.length - 1 && (
                    <span aria-hidden="true" className="text-champagne/70">
                      /
                    </span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <span className="eyebrow animate-fade">{eyebrow}</span>
          <h1 className="animate-fade-up mt-6 font-display text-[2.65rem] leading-[1.03] font-light text-white sm:text-6xl lg:text-[4.4rem]">
            {title}
          </h1>
          <p className="animate-fade-up mt-7 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            {description}
          </p>
          {(primary || secondary) && (
            <div
              className={`animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:items-center ${
                align === "center" ? "sm:justify-center" : ""
              }`}
            >
              {primary && (
                <Link href={primary.href} className="btn btn-gold">
                  {primary.label}
                </Link>
              )}
              {secondary && (
                <Link href={secondary.href} className="btn btn-outline-light">
                  {secondary.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2
        className={`mt-5 font-display text-[2.1rem] leading-[1.06] sm:text-[2.7rem] lg:text-[3.2rem] ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 text-[0.975rem] leading-relaxed md:text-base ${
            dark ? "text-white/65" : "text-charcoal/70"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const iconPaths: Record<string, ReactNode> = {
  detail: (
    <>
      <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.4l-1.9-5.6L4.5 10.9 10.1 9 12 3.5Z" />
      <path d="M18.7 15.6l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1Z" />
    </>
  ),
  standards: (
    <>
      <path d="M12 3.5 19 6v5.4c0 4.2-2.8 7.6-7 9.1-4.2-1.5-7-4.9-7-9.1V6l7-2.5Z" />
      <path d="m9 11.8 2.2 2.2L15.4 9.8" />
    </>
  ),
  expertise: (
    <>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 10v9.5h12V10" />
      <path d="M10 19.5v-5h4v5" />
      <path d="M2.5 21h19" />
    </>
  ),
  quality: (
    <>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="m8.7 14.3-1.2 6 4.5-2.5 4.5 2.5-1.2-6" />
      <path d="m10.2 9.5 1.3 1.4 2.4-2.6" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c-8 0-13 3.5-13 9.5A6.5 6.5 0 0 0 13.5 20C19.5 20 20 12 20 4Z" />
      <path d="M4 21c1.5-5 4.5-8.5 9-11" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v5.4c0 4.2-2.8 7.6-7 9.1-4.2-1.5-7-4.9-7-9.1V6l7-2.5Z" />
      <path d="M12 8.5v4M12 15.6v.4" />
    </>
  ),
  phone: (
    <>
      <path d="M7 3.5h3l1.4 4-2 1.4a11.5 11.5 0 0 0 5.7 5.7l1.4-2 4 1.4v3A2.5 2.5 0 0 1 18 19.5C11 19.5 4.5 13 4.5 6A2.5 2.5 0 0 1 7 3.5Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4 6.5 8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-6 6.5-11a6.5 6.5 0 0 0-13 0C5.5 15 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

export function LineIcon({
  name,
  className = "",
}: {
  name: keyof typeof iconPaths | string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {iconPaths[name] ?? iconPaths.detail}
    </svg>
  );
}
