export type Role = 'host' | 'vendor' | 'gatekeeper' | 'staff';

export interface Venue {
  id: string;
  name: string;
  location: string;
  image: string;
  capacity: number;
  rating: number;
  pricePerPlate: number;
  verified: boolean;
  amenities: string[];
}

export interface SaitDate {
  date: string; // ISO
  nepaliDate: string;
  type: 'shubha' | 'madhyam' | 'ashubha';
  event: string;
}

export interface Gig {
  id: string;
  venueName: string;
  role: string;
  date: string;
  time: string;
  pay: number;
  distance: string;
  urgent?: boolean;
}

export interface AnalyticsData {
  totalRevenue: number;
  growth: number;
  profitMargin: number;
  recentPayouts: {
    venue: string;
    date: string;
    amount: number;
    status: 'paid' | 'processing';
  }[];
}
