import React from 'react';
import { Calendar, MapPin, Clock, CalendarPlus, CheckCircle2 } from 'lucide-react';
import { Event } from '../types';
import { downloadIcsFile } from '../services/calendarService';

interface EventCardProps {
  event: Event;
  isRSVPed?: boolean;
  onRSVPClick?: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, isRSVPed = false, onRSVPClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full group">
      <div className="h-48 w-full relative overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-ecu-gold text-ecu-purple font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide shadow-sm">
          {event.type}
        </div>
        {isRSVPed && (
          <div className="absolute top-4 left-4 bg-green-500 text-white font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide shadow-sm flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Going
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-sm text-ecu-purple font-semibold mb-2">
           <Calendar className="w-4 h-4 mr-2" />
           {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{event.title}</h3>
        <p className="text-gray-600 mb-4 flex-1">{event.description}</p>
        
        <div className="space-y-2 text-sm text-gray-500 border-t pt-4 mt-auto">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-ecu-purple" />
            {event.time}
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-ecu-purple" />
            {event.location}
          </div>
        </div>
        
        <div className="mt-6 flex gap-2">
          <button 
            onClick={() => onRSVPClick && onRSVPClick(event)}
            disabled={isRSVPed}
            className={`flex-1 py-2 rounded-lg font-medium transition-all duration-200 ${
              isRSVPed 
                ? 'bg-green-100 text-green-700 cursor-default'
                : 'bg-ecu-purple text-white hover:bg-ecu-darkPurple shadow-md hover:shadow-lg'
            }`}
          >
            {isRSVPed ? 'You are going!' : 'RSVP Now'}
          </button>
          <button 
            onClick={() => downloadIcsFile(event)}
            title="Add to Calendar"
            className="px-3 bg-gray-50 text-ecu-purple rounded-lg hover:bg-ecu-gold hover:text-ecu-darkPurple transition-colors border border-gray-200"
          >
            <CalendarPlus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;