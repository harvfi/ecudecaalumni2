import { Event } from '../types';

export const downloadIcsFile = (event: Event) => {
  const formatDate = (dateStr: string, timeStr: string) => {
    // Basic parser for "2024-10-12" and "11:00 AM - 3:00 PM"
    const date = dateStr.replace(/-/g, '');
    const startTimeMatch = timeStr.split(' - ')[0].match(/(\d+):(\d+)\s*(AM|PM)/);
    
    if (!startTimeMatch) return `${date}T120000Z`;
    
    let hours = parseInt(startTimeMatch[1]);
    const minutes = startTimeMatch[2];
    const ampm = startTimeMatch[3];
    
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    
    const formattedHours = hours.toString().padStart(2, '0');
    return `${date}T${formattedHours}${minutes}00Z`;
  };

  const start = formatDate(event.date, event.time);
  // Default to 2 hours if end time is complex to parse
  const end = formatDate(event.date, event.time.includes('-') ? event.time.split('-')[1].trim() : event.time);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ECU DECA Alumni//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}@ecudeca.org`,
    `DTSTAMP:${start}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};