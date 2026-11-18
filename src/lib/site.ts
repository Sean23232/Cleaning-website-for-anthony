export const site = {
  name: "Anthony & Co.",
  legalName: "Anthony & Co. Cleaning",
  tagline: "Premium Residential & Commercial Cleaning Services",
  shortDescription:
    "Premium residential and commercial cleaning designed for those who expect exceptional quality, attention to detail, and a consistently pristine environment.",
  phoneDisplay: "+44 20 7946 0821",
  phoneHref: "tel:+442079460821",
  email: "enquiries@anthonyandco.co.uk",
  emailHref: "mailto:enquiries@anthonyandco.co.uk",
  city: "London",
  region: "Greater London",
  serviceArea: "Mayfair, Kensington, Chelsea, Belgravia & Greater London",
  serviceAreaShort: "Mayfair & Greater London",
  addressLine: "Mayfair, London, United Kingdom",
  mapQuery: "Mayfair, London, United Kingdom",
  hours: [
    { days: "Monday – Friday", times: "8:00 – 18:00" },
    { days: "Saturday", times: "9:00 – 16:00" },
    { days: "Sunday", times: "By arrangement" },
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anthonyandco.co.uk",
  established: "By appointment only",
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Residential", href: "/residential" },
  { label: "Commercial", href: "/commercial" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const services = [
  { label: "Residential Cleaning", href: "/residential" },
  { label: "Commercial Cleaning", href: "/commercial" },
  { label: "Deep Cleaning", href: "/residential#services" },
  { label: "Office & Workspace Cleaning", href: "/commercial#solutions" },
] as const;

export const serviceAreas = [
  "Mayfair",
  "Kensington",
  "Chelsea",
  "Belgravia",
  "Marylebone",
  "Notting Hill",
  "St John's Wood",
  "The City",
] as const;
