import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(185,154,104,0.18),transparent_55%)]" />
      <div className="container-lux relative z-10 py-32">
        <span className="eyebrow text-champagne-soft">404</span>
        <h1 className="mt-6 max-w-2xl font-display text-[2.6rem] leading-[1.04] sm:text-[3.6rem]">
          This page has been thoughtfully tidied away.
        </h1>
        <p className="mt-6 max-w-lg text-[0.975rem] leading-relaxed text-white/65">
          The page you are looking for is not here. Return to our homepage, or
          explore the cleaning services we offer for homes and businesses.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-gold">
            Return Home
          </Link>
          <Link href="/contact" className="btn btn-outline-light">
            Contact Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
