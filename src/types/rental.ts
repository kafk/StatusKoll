export type EventType = 'booking' | 'cleaning' | 'payment';
export type FilterStatus = 'all' | 'current' | 'past' | 'future';
export type SortOrder = 'newest' | 'oldest';

export interface TimelineEvent {
  date: string;
  text: string;
}

export interface RentalEvent {
  id: string;
  type: EventType;
  date: string;
  customer: string;
  period?: string;
  source?: string;
  amount?: string;
  note?: string;
  performedBy?: string;
  transaction?: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  checkIn: string;
  checkOut: string;
  period: string;
  amount: string;
  guests?: number;
  platform?: string;
  status: 'confirmed' | 'pending';
  filterStatus: FilterStatus;
  cleaningDone: boolean;
  paymentDone: boolean;
  timeline: TimelineEvent[];
}

export interface BookingFormData {
  guestName: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  price: number;
}
