import { Venue, SaitDate, Gig } from './types';

export const MOCK_VENUES: Venue[] = [
  {
    id: '1',
    name: 'Heritage Plaza & Banquet',
    location: 'Patan, Lalitpur',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=crop',
    capacity: 1200,
    rating: 4.9,
    pricePerPlate: 2500,
    verified: true,
    amenities: ['CCTV', 'AC', 'Parking', 'Generator']
  },
  {
    id: '2',
    name: 'Lumbini Grand Celebration Hub',
    location: 'Bhairahawa',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2047&auto=format&fit=crop',
    capacity: 800,
    rating: 4.7,
    pricePerPlate: 1800,
    verified: true,
    amenities: ['Parking', 'AC']
  },
  {
    id: '3',
    name: 'Grand Utsav Palace',
    location: 'Main Road, Utsavnagar',
    image: 'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?q=80&w=2070&auto=format&fit=crop',
    capacity: 1500,
    rating: 4.8,
    pricePerPlate: 2200,
    verified: true,
    amenities: ['Central AC', '360 Tour', 'Valet Parking']
  }
];

export const MOCK_SAITS = [
  { date: '2026-05-15', nepaliDate: 'Mangsir 15', type: 'shubha', event: 'Marriage' },
  { date: '2026-06-02', nepaliDate: 'Magh 02', type: 'shubha', event: 'Bratabandha' },
  { date: '2026-07-10', nepaliDate: 'Poush 10', type: 'madhyam', event: 'Opening' },
];

export const MOCK_GIGS = [
  {
    id: 'g1',
    venueName: 'Grand Utsav Palace',
    role: 'Event Crew',
    date: 'Sat, Oct 14',
    time: '4:00 PM – 11:00 PM',
    pay: 800,
    distance: '2.4 KM AWAY',
    urgent: true
  },
  {
    id: 'g2',
    venueName: 'Heritage Plaza',
    role: 'Security',
    date: 'Fri, Oct 20',
    time: '9:00 PM – 3:00 AM',
    pay: 1200,
    distance: '0.8 KM AWAY',
    urgent: true
  }
];

export const MOCK_NEWS = [
  {
    id: 'n1',
    title: 'Neon Nights: Live EDM Concert',
    type: 'Concert',
    content: 'Get ready for an electrifying night featuring Top DJs from Kathmandu and local talents.',
    location: 'Utsav Palace Main Hall',
    timestamp: '2026-05-15T21:00:00Z',
    guest: 1200
  },
  {
    id: 'n2',
    title: 'Hissan Rastrapati Cup Final',
    type: 'Sports',
    content: 'The biggest inter-college sports festival in Province 1 reaches its finale!',
    location: 'Sahid Rangasala',
    timestamp: '2026-05-10T14:30:00Z',
    guest: 5000
  },
  {
    id: 'n3',
    title: 'Traffic Alert: Road Construction',
    type: 'Emergency',
    content: 'Heavy machinery active near Utsav Hospital. Please use the bypass road.',
    location: 'Hospital Chowk',
    timestamp: new Date().toISOString(),
    guest: 'N/A'
  }
];

export const MOCK_SPORTS = [
  {
    id: 's1',
    tournament: 'Hissan Rastyapati Cup',
    type: 'Football',
    teams: 'City College vs Model Campus',
    score: '2 - 1',
    location: 'Sahid Rangasala',
    status: 'Live • 84\''
  },
  {
    id: 's2',
    tournament: 'Mechi-Mahakali Gold Cup',
    type: 'Football',
    teams: 'Jhapa FC vs Utsav City FC',
    score: '0 - 0',
    location: 'Sunsari Stadium',
    status: 'Halftime'
  }
];

export const EMERGENCY_CONTACTS = [
  { name: 'District Police Office (Morang)', phone: '100', category: 'Police' },
  { name: 'Utsav Hospital (Ambulance)', phone: '+977-21-420222', category: 'Health' },
  { name: 'Nobel Hospital (Emergency Room)', phone: '+977-21-460733', category: 'Health' },
  { name: 'Fire Brigade (Utsavnagar Meta)', phone: '101', category: 'Fire' }
];

export const MOCK_USERS: any[] = [];

export const CEREMONY_CHECKLIST = {
  'Vivah': ['Pandit Booking', 'Sait Verification', 'Menu Selection', 'QR Invites', 'Photography Pack', 'DJ & Sound'],
  'Bratabandha': ['Ritual Utensils', 'Guru Selection', 'Traditional Wear', 'Catering'],
  'Pasni': ['Silver Spoon/Bowl', 'Cultural Dress', 'Small-group Menu']
};
