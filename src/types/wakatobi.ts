export type IslandName = 'Wangi-Wangi' | 'Kaledupa' | 'Tomia' | 'Binongko' | 'Taman Nasional';

export type SpotCategory = 'all' | 'diving' | 'island_hopping' | 'culture' | 'eco_nature';

export interface Destination {
  id: string;
  name: string;
  subtitle: string;
  island: IslandName;
  category: 'diving' | 'island_hopping' | 'culture' | 'eco_nature';
  shortDesc: string;
  fullDesc: string;
  heroImage: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  diveLevel?: 'Pemula / Snorkel' | 'Open Water' | 'Advanced / Nitrox' | 'Semua Tingkatan';
  depthRange?: string;
  visibility?: string;
  currentType?: string;
  coordinates?: string;
  estimatedPrice: number; // in IDR
  suggestedDuration: string;
  bestTimeToVisit: string;
  highlightTags: string[];
  facilities: string[];
  rundown: {
    title: string;
    description: string;
  }[];
}

export interface TripPackage {
  id: string;
  title: string;
  slug: string;
  islandFocus: string;
  duration: string;
  badge?: string;
  price: number; // in IDR
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  shortDesc: string;
  overview: string;
  groupType: 'Open Trip' | 'Private Charter' | 'Dive Safari';
  maxPax: number;
  inclusions: string[];
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    activities: string[];
  }[];
}

export interface IslandProfile {
  id: string;
  code: 'WA' | 'KA' | 'TO' | 'BI';
  name: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  coralCount: string;
  diveSites: number;
  highlights: string[];
  character: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  islandInterest: string;
  packageType: string;
  travelDate: string;
  guestCount: number;
  message: string;
}

export type BookingStatus = 'Menunggu Konfirmasi' | 'Terkonfirmasi' | 'Selesai' | 'Dibatalkan';

export interface BookingRecord {
  id: string; // e.g. WKT-89210
  travelerName: string;
  email: string;
  phone: string;
  tripPackageId: string;
  tripPackageTitle: string;
  departureDate: string;
  guestCount: number;
  pricePerPax: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  notes?: string;
}
