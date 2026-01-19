export interface Destination {
  id: string;
  name: string;
  code: string;
  description: string;
  image_url: string;
}

export interface TourType {
  id: string;
  name: string;
  code: 'vip' | 'standard' | 'basic';
  description: string;
}

export interface Tour {
  id: string;
  destination: Destination;
  tourType: TourType;
  price: number;
  durationNights: number;
  maxParticipants: number;
  inclusions: string[];
  isActive: boolean;
}

export interface TourDate {
  id: string;
  destination: Destination;
  month: string;
  year: number;
  availableSlots: number;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  tourId: string;
  tourDateId: string;
  companyName: string;
  position: string;
  email: string;
  phone: string;
  country: string;
  numParticipants: number;
  isGroup: boolean;
  participationReason: string;
  passportNumber: string;
  passportExpiry: string;
  travelType: 'personal' | 'business';
  status: 'pending' | 'confirmed' | 'cancelled';
  totalAmount: number;
  participants?: BookingParticipant[];
}

export interface BookingParticipant {
  name: string;
  phone: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  position: string;
  content: string;
  rating: number;
  imageUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  publishedAt: string;
}

export type Language = 'fr' | 'en';
