"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, site } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-navy/10 bg-ivory/95 text-navy shadow-[0_8px_30px_-24px_rgba(20,37,45,0.5)] backdrop-blur-md"
          : "border-b border-white/15 bg-transparent text-white"
      }`}
    >
      <div className="container-lux">
        <div className="flex h-[74px] items-center justify-between gap-6 md:h-[86px]">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${site.name} home`}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center border font-display text-lg leading-none tracking-tight transition-colors duration-500 md:h-11 md:w-11 ${
                solid
                  ? "border-champagne/60 text-champagne"
                  : "border-white/40 text-white group-hover:border-champagne-soft"
              }`}
            >
              A
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.15rem] tracking-[0.18em] md:text-[1.3rem]">
                ANTHONY &amp; CO.
              </span>
              <span
                className={`mt-1 hidden text-[0.5rem] font-medium uppercase tracking-[0.34em] sm:block ${
                  solid ? "text-charcoal/55" : "text-white/65"
                }`}
              >
                Residential &amp; Commercial Cleaning
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                    active
                      ? solid
                        ? "text-navy"
                        : "text-white"
                      : solid
                        ? "text-charcoal/70 hover:text-navy"
                        : "text-white/75 hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-champagne transition-all duration-300 ${
                      active ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              className={`hidden text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors xl:block ${
                solid
                  ? "text-charcoal/70 hover:text-champagne"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {site.phoneDisplay}
            </a>
            <Link
              href="/contact#quote"
              className="btn btn-gold hidden !px-6 !py-3.5 !text-[0.66rem] sm:inline-flex"
            >
              Get a Quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`flex h-11 w-11 items-center justify-center border transition-colors lg:hidden ${
                solid
                  ? "border-navy/15 text-navy hover:border-champagne"
                  : "border-white/30 text-white hover:border-white/60"
              }`}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-px w-5 transition-all duration-300 ${
                    solid ? "bg-navy" : "bg-white"
                  } ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-px w-5 transition-all duration-300 ${
                    solid ? "bg-navy" : "bg-white"
                  } ${open ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`absolute left-0 block h-px w-5 transition-all duration-300 ${
                    solid ? "bg-navy" : "bg-white"
                  } ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-navy/10 bg-ivory transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-lux py-8">
          <nav className="flex flex-col" aria-label="Mobile">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-navy/10 py-4 font-display text-2xl text-navy transition-colors hover:text-champagne"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-4">
            <Link href="/contact#quote" className="btn btn-gold w-full">
              Request a Quote
            </Link>
            <a
              href={site.phoneHref}
              className="text-center text-[0.72rem] font-medium uppercase tracking-[0.2em] text-charcoal/70"
            >
              Call {site.phoneDisplay}
            </a>
            <p className="text-center text-[0.7rem] uppercase tracking-[0.18em] text-charcoal/50">
              {site.serviceAreaShort}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
