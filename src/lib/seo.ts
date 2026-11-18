import type { Metadata } from "next";
import { site } from "@/lib/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
}: MetaInput): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_GB",
      type: "website",
      images: [
        {
          url: "https://images.pexels.com/photos/8082312/pexels-photo-8082312.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80",
          width: 1200,
          height: 800,
          alt: "Immaculate luxury interior maintained by Anthony & Co.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#business`,
    name: site.legalName,
    alternateName: site.name,
    description: site.shortDescription,
    url: site.url,
    telephone: site.phoneDisplay,
    email: site.email,
    priceRange: "£££",
    image: `${site.url}/images/og.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressRegion: "Greater London",
      addressCountry: "GB",
    },
    areaServed: [
      "Mayfair",
      "Kensington",
      "Chelsea",
      "Belgravia",
      "Marylebone",
      "Notting Hill",
      "St John's Wood",
      "City of London",
    ].map((name) => ({ "@type": "Place", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential Cleaning",
            url: `${site.url}/residential`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Cleaning",
            url: `${site.url}/commercial`,
          },
        },
      ],
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  offerings,
}: {
  name: string;
  description: string;
  path: string;
  offerings: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    url: `${site.url}${path}`,
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "City", name: "London" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${name} options`,
      itemListElement: offerings.map((offering) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: offering },
      })),
    },
  };
}
