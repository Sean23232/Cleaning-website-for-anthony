import Link from "next/link";
import { navigation, services, site } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-ivory">
      <div className="container-lux">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.1fr] lg:gap-10 lg:py-20">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center border border-champagne/60 font-display text-lg text-champagne">
                A
              </span>
              <span className="font-display text-xl tracking-[0.18em]">
                ANTHONY &amp; CO.
              </span>
            </Link>
            <p className="mt-6 max-w-xs font-display text-2xl leading-snug text-ivory/85">
              Premium Residential &amp; Commercial Cleaning Services.
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/55">
              A higher standard of clean for private residences, offices and
              commercial spaces across {site.serviceAreaShort}.
            </p>
          </div>

          <div>
            <h2 className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-champagne">
              Explore
            </h2>
            <ul className="mt-6 space-y-3.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ivory/65 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-champagne">
              Services
            </h2>
            <ul className="mt-6 space-y-3.5">
              {services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-ivory/65 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-champagne">
              Contact
            </h2>
            <ul className="mt-6 space-y-4 text-sm text-ivory/65">
              <li>
                <a
                  href={site.phoneHref}
                  className="transition-colors hover:text-ivory"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="break-all transition-colors hover:text-ivory"
                >
                  {site.email}
                </a>
              </li>
              <li className="leading-relaxed">{site.serviceArea}</li>
              <li className="leading-relaxed text-ivory/45">
                Mon – Fri 8:00 – 18:00 · Sat 9:00 – 16:00
              </li>
            </ul>
            <Link href="/contact#quote" className="btn btn-gold mt-7 w-full">
              Request a Quote
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-ivory/10 py-7 text-[0.68rem] uppercase tracking-[0.16em] text-ivory/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>{site.established}</span>
            <Link href="/contact" className="transition-colors hover:text-ivory/80">
              Enquiries
            </Link>
            <Link href="/admin" className="transition-colors hover:text-ivory/80">
              Studio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
