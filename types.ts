export interface Alumni {
  id: string;
  name: string;
  gradYear: number;
  company: string;
  role: string;
  imageUrl: string;
  bio: string;
  achievement: string;
  email?: string;
  isSubscribed?: boolean;
  rsvpedEventIds?: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'Networking' | 'Social' | 'Workshop' | 'Campus';
  imageUrl?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  author: string;
  category: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}