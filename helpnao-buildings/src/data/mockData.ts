export interface Room {
  id: string;
  name: string;
  type: 'living' | 'bedroom' | 'kitchen' | 'bathroom' | 'balcony' | 'dining' | 'study';
  dimensions: string;
  sqft: number;
  flooring: string;
  paint: string;
  fittings: string[];
  windows: number;
  notes?: string;
  images: string[];
}

export interface Flat {
  id: string;
  buildingId: string;
  flatCode: string;
  title: string;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  floorNumber: number;
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West';
  status: 'Available' | 'Booked';
  price?: number;
  images: {
    category: 'Living' | 'Bedroom' | 'Kitchen' | 'Bathroom' | 'Balcony' | 'Other';
    url: string;
  }[];
  rooms: Room[];
}

export interface Building {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  lat: number;
  lng: number;
  totalFloors: number;
  totalUnits: number;
  yearBuilt: number;
  description: string;
  facilities: {
    lift: boolean;
    gas: boolean;
    water: boolean;
    parking: boolean;
    security: boolean;
    generator: boolean;
    cctv: boolean;
    fireSafety: boolean;
  };
  images: string[];
  flats: Flat[];
}

const deterministicNumber = (seed: string): number => {
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }

  return hash / 4294967295;
};

const createRooms = (flatId: string, bedrooms: number): Room[] => {
  const rooms: Room[] = [
    {
      id: `${flatId}-living`,
      name: 'Living Room',
      type: 'living',
      dimensions: "18' x 14'",
      sqft: 252,
      flooring: 'Vitrified Tiles',
      paint: 'Asian Paints Royale - Ivory White',
      fittings: ['LED Panel Lights', 'AC Point', 'TV Unit Space'],
      windows: 2,
      notes: 'Spacious living area with ample natural light',
      images: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=800',
      ],
    },
    {
      id: `${flatId}-kitchen`,
      name: 'Kitchen',
      type: 'kitchen',
      dimensions: "12' x 10'",
      sqft: 120,
      flooring: 'Anti-skid Ceramic Tiles',
      paint: 'Washable Enamel Paint - Cream',
      fittings: ['Modular Cabinets', 'Granite Counter', 'Chimney Point', 'Water Purifier Point'],
      windows: 1,
      notes: 'Modern modular kitchen with exhaust',
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      ],
    },
    {
      id: `${flatId}-bathroom1`,
      name: 'Master Bathroom',
      type: 'bathroom',
      dimensions: "8' x 6'",
      sqft: 48,
      flooring: 'Anti-skid Ceramic Tiles',
      paint: 'Waterproof Paint - White',
      fittings: ['Premium CP Fittings', 'Geyser Point', 'Wall-mounted WC', 'Vanity Unit'],
      windows: 1,
      images: [
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      ],
    },
    {
      id: `${flatId}-balcony`,
      name: 'Balcony',
      type: 'balcony',
      dimensions: "10' x 4'",
      sqft: 40,
      flooring: 'Rustic Tiles',
      paint: 'Weather Shield - White',
      fittings: ['MS Railing', 'Utility Area'],
      windows: 0,
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      ],
    },
  ];

  for (let i = 1; i <= bedrooms; i++) {
    rooms.push({
      id: `${flatId}-bedroom${i}`,
      name: i === 1 ? 'Master Bedroom' : `Bedroom ${i}`,
      type: 'bedroom',
      dimensions: i === 1 ? "14' x 12'" : "12' x 10'",
      sqft: i === 1 ? 168 : 120,
      flooring: 'Laminate Wooden Flooring',
      paint: 'Asian Paints - Soft Beige',
      fittings:
        i === 1
          ? ['Walk-in Wardrobe', 'AC Point', 'Study Table Space', 'Attached Bathroom']
          : ['Built-in Wardrobe', 'AC Point', 'Study Desk Area'],
      windows: 2,
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
      ],
    });
  }

  return rooms;
};

const createFlats = (buildingId: string, totalFloors: number, unitsPerFloor: number): Flat[] => {
  const flats: Flat[] = [];
  const facings: Flat['facing'][] = ['North', 'South', 'East', 'West', 'North-East', 'South-West'];

  for (let floor = 1; floor <= Math.min(totalFloors - 1, 5); floor++) {
    for (let unit = 1; unit <= Math.min(unitsPerFloor, 3); unit++) {
      const flatId = `${buildingId}-${floor}${String.fromCharCode(64 + unit)}`;
      const bedrooms = [2, 3, 3, 4][Math.floor(deterministicNumber(`${flatId}-bedrooms`) * 4)];
      const sqft = 800 + bedrooms * 300 + Math.floor(deterministicNumber(`${flatId}-sqft`) * 200);

      flats.push({
        id: flatId,
        buildingId,
        flatCode: `${floor}${String.fromCharCode(64 + unit)}`,
        title: `${bedrooms} BHK Premium Apartment - ${floor}${String.fromCharCode(64 + unit)}`,
        sqft,
        bedrooms,
        bathrooms: bedrooms,
        balconies: Math.min(bedrooms, 2),
        floorNumber: floor,
        facing: facings[Math.floor(deterministicNumber(`${flatId}-facing`) * facings.length)],
        status: deterministicNumber(`${flatId}-status`) > 0.3 ? 'Available' : 'Booked',
        images: [
          { category: 'Living', url: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800' },
          { category: 'Living', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800' },
          { category: 'Bedroom', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
          { category: 'Bedroom', url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800' },
          { category: 'Kitchen', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800' },
          { category: 'Kitchen', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800' },
          { category: 'Bathroom', url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800' },
          { category: 'Bathroom', url: 'https://images.unsplash.com/photo-1600566752734-2a0cd66c42df?w=800' },
          { category: 'Balcony', url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800' },
          { category: 'Other', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800' },
        ],
        rooms: createRooms(flatId, bedrooms),
      });
    }
  }

  return flats;
};

export const buildings: Building[] = [
  {
    id: "gulshan-skyline",
    name: "Gulshan Skyline Residences",
    city: "Dhaka",
    area: "Gulshan-2",
    address: "Road 57, Gulshan-2, Dhaka 1212",
    lat: 23.7925,
    lng: 90.4078,
    totalFloors: 25,
    totalUnits: 120,
    yearBuilt: 2023,
    description:
      "Gulshan Skyline Residences offers premium apartments in the heart of Gulshan with modern amenities, refined interiors, and quick access to business hubs.",
    facilities: {
      lift: true,
      gas: true,
      water: true,
      parking: true,
      security: true,
      generator: true,
      cctv: true,
      fireSafety: true,
    },
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
    ],
    flats: [],
  },
  {
    id: "banani-prime",
    name: "Banani Prime Heights",
    city: "Dhaka",
    area: "Banani",
    address: "Road 11, Banani, Dhaka 1213",
    lat: 23.7933,
    lng: 90.4043,
    totalFloors: 18,
    totalUnits: 72,
    yearBuilt: 2022,
    description:
      "A modern residential tower in Banani with thoughtfully planned layouts and convenient access to schools, offices, and lifestyle destinations.",
    facilities: {
      lift: true,
      gas: true,
      water: true,
      parking: true,
      security: true,
      generator: true,
      cctv: true,
      fireSafety: true,
    },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200",
    ],
    flats: [],
  },
  {
    id: "bashundhara-gardens",
    name: "Bashundhara Garden City",
    city: "Dhaka",
    area: "Bashundhara R/A",
    address: "Block D, Bashundhara Residential Area, Dhaka 1229",
    lat: 23.8173,
    lng: 90.4279,
    totalFloors: 20,
    totalUnits: 96,
    yearBuilt: 2024,
    description:
      "Family-friendly apartments in Bashundhara R/A with open views, strong security, and easy connectivity to major roads and shopping.",
    facilities: {
      lift: true,
      gas: false,
      water: true,
      parking: true,
      security: true,
      generator: true,
      cctv: true,
      fireSafety: true,
    },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
    ],
    flats: [],
  },
  {
    id: "dhanmondi-lakeview",
    name: "Dhanmondi Lakeview Apartments",
    city: "Dhaka",
    area: "Dhanmondi",
    address: "Road 27, Dhanmondi, Dhaka 1209",
    lat: 23.7465,
    lng: 90.3760,
    totalFloors: 12,
    totalUnits: 48,
    yearBuilt: 2021,
    description:
      "Comfortable modern living near Dhanmondi Lake—ideal for families seeking calm surroundings within the city.",
    facilities: {
      lift: true,
      gas: true,
      water: true,
      parking: true,
      security: true,
      generator: true,
      cctv: true,
      fireSafety: true,
    },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200",
    ],
    flats: [],
  },
  {
    id: "mohammadpur-green",
    name: "Mohammadpur Green Residency",
    city: "Dhaka",
    area: "Mohammadpur",
    address: "Nurjahan Road, Mohammadpur, Dhaka 1207",
    lat: 23.7640,
    lng: 90.3534,
    totalFloors: 15,
    totalUnits: 60,
    yearBuilt: 2022,
    description:
      "Well-planned apartments in Mohammadpur with practical layouts, reliable utilities, and strong neighborhood access.",
    facilities: {
      lift: true,
      gas: true,
      water: true,
      parking: true,
      security: true,
      generator: false,
      cctv: true,
      fireSafety: true,
    },
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    ],
    flats: [],
  },
  {
    id: "uttara-parkview",
    name: "Uttara Parkview Towers",
    city: "Dhaka",
    area: "Uttara",
    address: "Sector 7, Uttara, Dhaka 1230",
    lat: 23.8740,
    lng: 90.3983,
    totalFloors: 22,
    totalUnits: 88,
    yearBuilt: 2023,
    description:
      "A modern tower in Uttara with great connectivity, family facilities, and spacious apartments.",
    facilities: {
      lift: true,
      gas: true,
      water: true,
      parking: true,
      security: true,
      generator: true,
      cctv: true,
      fireSafety: true,
    },
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
    ],
    flats: [],
  },
  {
    id: "mirpur-central",
    name: "Mirpur Central Heights",
    city: "Dhaka",
    area: "Mirpur-10",
    address: "Mirpur-10, Dhaka 1216",
    lat: 23.8076,
    lng: 90.3686,
    totalFloors: 20,
    totalUnits: 100,
    yearBuilt: 2022,
    description:
      "City-ready apartments in Mirpur with convenient access to transport, markets, and schools.",
    facilities: {
      lift: true,
      gas: false,
      water: true,
      parking: true,
      security: true,
      generator: true,
      cctv: true,
      fireSafety: true,
    },
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
    ],
    flats: [],
  },
  {
    id: "chattogram-seaview",
    name: "Chattogram Seaview Residences",
    city: "Chattogram",
    area: "Agrabad",
    address: "Agrabad Commercial Area, Chattogram 4100",
    lat: 22.3296,
    lng: 91.8123,
    totalFloors: 16,
    totalUnits: 64,
    yearBuilt: 2023,
    description:
      "Modern residences in Agrabad, designed for comfort with easy access to the city's commercial center.",
    facilities: {
      lift: true,
      gas: true,
      water: true,
      parking: true,
      security: true,
      generator: true,
      cctv: true,
      fireSafety: true,
    },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200",
    ],
    flats: [],
  },
];

// Generate flats for each building
buildings.forEach((building) => {
  const unitsPerFloor = Math.ceil(building.totalUnits / building.totalFloors);
  building.flats = createFlats(building.id, building.totalFloors, unitsPerFloor);
});

export const popularAreas = [
  {
    name: "Gulshan",
    city: "Dhaka",
    buildingCount: 24,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600",
  },
  {
    name: "Banani",
    city: "Dhaka",
    buildingCount: 18,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600",
  },
  {
    name: "Bashundhara R/A",
    city: "Dhaka",
    buildingCount: 20,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600",
  },
  {
    name: "Dhanmondi",
    city: "Dhaka",
    buildingCount: 16,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600",
  },
  {
    name: "Mohammadpur",
    city: "Dhaka",
    buildingCount: 14,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
  },
  {
    name: "Uttara",
    city: "Dhaka",
    buildingCount: 22,
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600",
  },
  {
    name: "Mirpur",
    city: "Dhaka",
    buildingCount: 19,
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600",
  },
  {
    name: "Agrabad",
    city: "Chattogram",
    buildingCount: 11,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
  },
];

export const facilityLabels: Record<keyof Building['facilities'], string> = {
  lift: 'Lift/Elevator',
  gas: 'Piped Gas',
  water: '24/7 Water',
  parking: 'Parking',
  security: '24/7 Security',
  generator: 'Power Backup',
  cctv: 'CCTV',
  fireSafety: 'Fire Safety',
};