import { Alumni, Event, NewsItem } from './types';

export const MOCK_ALUMNI: Alumni[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    gradYear: 2018,
    company: 'Google',
    role: 'Senior Product Marketing Manager',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    bio: 'Former ECU DECA President (2017-2018). Passionate about mentorship and tech marketing.',
    achievement: 'Led the global launch campaign for the latest Pixel device features.'
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    gradYear: 2020,
    company: 'Deloitte',
    role: 'Strategy Consultant',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    bio: 'ICDC Winner 2019. Helping organizations navigate digital transformation.',
    achievement: 'Recently promoted to Senior Consultant in record time.'
  },
  {
    id: '3',
    name: 'Emily Chen',
    gradYear: 2015,
    company: 'East Carolina University',
    role: 'Adjunct Professor',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    bio: 'Returned to ECU to teach entrepreneurship and guide the next generation.',
    achievement: 'Received the "Alumni of the Year" award for service to the department.'
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Annual Alumni Homecoming Tailgate',
    date: '2024-10-12',
    time: '11:00 AM - 3:00 PM',
    location: 'Dowdy-Ficklen Stadium, Greenville, NC',
    description: 'Join us for food, drinks, and networking before the Pirates take on the field! Look for the purple DECA tent near Gate 4.',
    type: 'Social',
    imageUrl: 'https://picsum.photos/800/400?random=10'
  },
  {
    id: '2',
    title: 'Executive Leadership Panel: Navigating Corporate',
    date: '2024-11-05',
    time: '6:00 PM - 7:30 PM',
    location: 'Main Campus Student Center & Virtual',
    description: 'A hybrid event featuring alumni executives from Fortune 500 companies sharing their career journeys.',
    type: 'Workshop',
    imageUrl: 'https://picsum.photos/800/400?random=11'
  },
  {
    id: '3',
    title: 'Winter Networking Gala',
    date: '2024-12-14',
    time: '7:00 PM - 10:00 PM',
    location: 'The Greenville Convention Center',
    description: 'Our black-tie optional end-of-year celebration. Tickets required.',
    type: 'Networking',
    imageUrl: 'https://picsum.photos/800/400?random=12'
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'ECU DECA Chapter Breaks Records at CDC',
    summary: 'The on-campus chapter took home 15 trophies at this years Career Development Conference, with 25 students qualifying for ICDC.',
    date: '2024-03-15',
    author: 'Chapter President',
    category: 'Chapter News'
  },
  {
    id: '2',
    title: 'Alumni Mentorship Program Launching Fall 2024',
    summary: 'We are pairing 50 alumni with current students. Sign up now to give back and help guide the next generation of business leaders.',
    date: '2024-08-01',
    author: 'Alumni Board',
    category: 'Initiatives'
  }
];