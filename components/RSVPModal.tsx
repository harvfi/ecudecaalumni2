import React, { useState } from 'react';
import { X, CalendarCheck, Mail, Loader2 } from 'lucide-react';
import { Event } from '../types';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onConfirm: (email: string) => void;
}

const RSVPModal: React.FC<RSVPModalProps> = ({ isOpen, onClose, event, onConfirm }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      onConfirm(email);
      setIsSubmitting(false);
      setEmail('');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-ecu-darkPurple/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all animate-in zoom-in duration-200">
        <div className="bg-ecu-purple p-6 text-white flex justify-between items-center">
          <h3 className="text-xl font-bold font-serif flex items-center">
            <CalendarCheck className="w-6 h-6 mr-2 text-ecu-gold" />
            RSVP for Event
          </h3>
          <button onClick={onClose} className="hover:bg-white/10 rounded-full p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <h4 className="text-lg font-bold text-gray-900">{event.title}</h4>
            <p className="text-sm text-gray-500 mt-1">{event.date} • {event.time}</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your email to secure your spot
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pirate@ecu.edu"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-ecu-purple focus:ring-0 outline-none transition-colors"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              We will send a calendar invite and add this to your alumni history.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-ecu-gold text-ecu-purple py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Registering...
              </>
            ) : (
              'Confirm Attendance'
            )}
          </button>
          
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
             <p className="text-xs text-gray-400">
               Questions? Email <a href="mailto:ecudecaalumni@gmail.com" className="text-ecu-purple hover:underline">ecudecaalumni@gmail.com</a>
             </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RSVPModal;