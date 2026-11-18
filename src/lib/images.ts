const pexels = (id: number, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&q=80`;

export const images = {
  heroHome: {
    src: pexels(8082312, 2000),
    alt: "Sunlit luxury living room with floor-to-ceiling windows, polished floors and elegant seating",
  },
  brandIntro: {
    src: pexels(6301169, 1200),
    alt: "Immaculate modern living room with a fireplace, sculptural seating and soft natural light",
  },
  residentialCard: {
    src: pexels(6899354, 1200),
    alt: "Bright luxury residence with a spotless open-plan living area and kitchen",
  },
  residentialIntro: {
    src: pexels(6987712, 1200),
    alt: "Elegant, immaculately presented living room with tailored furniture and natural light",
  },
  livingWide: {
    src: pexels(36710315, 1600),
    alt: "Contemporary living room with glass walls opening onto a garden terrace",
  },
  officeGlass: {
    src: pexels(1098982, 1400),
    alt: "Refined office entrance with black-framed glass doors and polished stone floors",
  },
  commercialCard: {
    src: pexels(8477485, 1200),
    alt: "Modern corporate office corridor with glass-walled meeting rooms and immaculate flooring",
  },
  lifestyleBanner: {
    src: pexels(8146212, 2000),
    alt: "Elegant marble kitchen with high-end finishes, softly lit and perfectly presented",
  },
  trustProfessional: {
    src: pexels(6466212, 1200),
    alt: "Professional housekeeper in a refined uniform carefully preparing a luxury room",
  },
  residentialHero: {
    src: pexels(6585757, 2000),
    alt: "Serene luxury bedroom with pendant lighting, crisp linens and immaculate surfaces",
  },
  residentialLifestyle: {
    src: pexels(6538905, 1400),
    alt: "Beautifully maintained contemporary bedroom and living space in natural daylight",
  },
  residentialBathroom: {
    src: pexels(8146150, 1400),
    alt: "Polished marble bathroom with a freestanding bath and city views",
  },
  kitchenDetail: {
    src: pexels(8146212, 1400),
    alt: "Marble kitchen surfaces and cabinetry maintained to a showroom standard",
  },
  livingDetail: {
    src: pexels(7545494, 1400),
    alt: "Spacious, dust-free living room with tailored upholstery and clean lines",
  },
  apartmentDetail: {
    src: pexels(6538893, 1400),
    alt: "Bright apartment interior prepared and presented before new occupants arrive",
  },
  commercialHero: {
    src: pexels(5511098, 2000),
    alt: "Premium open-plan office with contemporary furniture, glass partitions and spotless floors",
  },
  commercialWorkspace: {
    src: pexels(5511103, 1600),
    alt: "Refined office reception area with stone surfaces and generous daylight",
  },
  commercialDesks: {
    src: pexels(7534208, 1400),
    alt: "Minimalist office desks and workstations kept clean and presentation-ready",
  },
  commercialLobby: {
    src: pexels(164586, 1400),
    alt: "Cornerstone lobby with marble walls, glazed screens and polished floors",
  },
  retailShowroom: {
    src: pexels(31318437, 1400),
    alt: "Elegant retail showroom with considered merchandising and immaculate surfaces",
  },
  aboutHero: {
    src: pexels(6466222, 2000),
    alt: "Professional cleaning attendant maintaining a luxury suite with care and discretion",
  },
  aboutTeam: {
    src: pexels(6466224, 1400),
    alt: "Attendant in a tailored uniform preparing an upscale room to a meticulous standard",
  },
  aboutDetail: {
    src: pexels(6466219, 1200),
    alt: "Housekeeping professional holding freshly pressed white linens in a luxury suite",
  },
  contactImage: {
    src: pexels(5511103, 1600),
    alt: "Calm, light-filled reception space reflecting a professionally maintained environment",
  },
} as const;

export type ImageAsset = { src: string; alt: string };
