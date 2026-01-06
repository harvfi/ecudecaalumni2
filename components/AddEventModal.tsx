import React, { useState, useRef } from 'react';
import { X, Calendar, MapPin, Clock, FileText, Send, Mail, Loader2, CheckCircle, ImagePlus, Trash2 } from 'lucide-react';
import { Event } from '../types';
import { draftAnnouncementEmail, simulateEmailDispatch } from '../services/emailService';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated: (event: Event) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onEventCreated }) => {
  const [step, setStep] = useState<'form' | 'drafting' | 'preview' | 'sending' | 'success'>('form');
  const [draftedEmail, setDraftedEmail] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    type: 'Networking' as Event['type'],
    imageUrl: 'https://picsum.photos/800/400?random=' + Math.floor(Math.random() * 100)
  });

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setFormData({ 
      ...formData, 
      imageUrl: 'https://picsum.photos/800/400?random=' + Math.floor(Math.random() * 100) 
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('drafting');
    
    const newEvent: Event = {
      ...formData,
      id: Date.now().toString(),
    };

    const email = await draftAnnouncementEmail(newEvent);
    setDraftedEmail(email);
    setStep('preview');
  };

  const handleSendEmails = async () => {
    setStep('sending');
    await simulateEmailDispatch(452); // Mock subscriber count
    onEventCreated({ ...formData, id: Date.now().toString() });
    setStep('success');
  };

  const reset = () => {
    setStep('form');
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      type: 'Networking',
      imageUrl: 'https://picsum.photos/800/400?random=' + Math.floor(Math.random() * 100)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-ecu-darkPurple/90 backdrop-blur-md" onClick={step === 'form' ? onClose : undefined}></div>

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all">
        {step === 'form' && (
          <>
            <div className="bg-ecu-purple p-6 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold font-serif">Create New Event</h3>
              <button onClick={onClose} className="hover:bg-white/10 rounded-full p-1"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Image Upload Section */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Image</label>
                <div 
                  className="relative h-40 w-full rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center overflow-hidden transition-all hover:border-ecu-purple group cursor-pointer"
                  onClick={triggerFileInput}
                >
                  {formData.imageUrl && !formData.imageUrl.includes('picsum.photos') ? (
                    <>
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                         <button 
                           type="button"
                           onClick={(e) => { e.stopPropagation(); triggerFileInput(); }}
                           className="bg-white text-ecu-purple p-2 rounded-full hover:bg-ecu-gold transition-colors"
                         >
                           <ImagePlus className="w-5 h-5" />
                         </button>
                         <button 
                           type="button"
                           onClick={(e) => { e.stopPropagation(); removeImage(); }}
                           className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                         >
                           <Trash2 className="w-5 h-5" />
                         </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-4">
                      <ImagePlus className="w-10 h-10 text-gray-400 mx-auto mb-2 group-hover:text-ecu-purple" />
                      <p className="text-sm text-gray-500 font-medium">Click to upload a custom event photo</p>
                      <p className="text-xs text-gray-400 mt-1">Or we'll use a random Pirate placeholder</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input 
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ecu-purple outline-none" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Spring Alumni Gala"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ecu-purple outline-none"
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ecu-purple outline-none"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as any})}
                  >
                    <option value="Networking">Networking</option>
                    <option value="Social">Social</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Campus">Campus</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input 
                      placeholder="6:00 PM - 8:00 PM"
                      required
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-ecu-purple outline-none"
                      value={formData.time}
                      onChange={e => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input 
                      placeholder="Campus Student Center"
                      required
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-ecu-purple outline-none"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  rows={3}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-ecu-purple outline-none"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="What should alumni expect?"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-ecu-purple text-white py-3 rounded-xl font-bold hover:bg-ecu-darkPurple transition-colors flex items-center justify-center"
              >
                <FileText className="w-5 h-5 mr-2" />
                Generate Announcement Draft
              </button>
            </form>
          </>
        )}

        {step === 'drafting' && (
          <div className="p-12 text-center">
            <Loader2 className="w-12 h-12 text-ecu-purple animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-bold text-ecu-darkPurple font-serif">Gemini is drafting your email...</h3>
            <p className="text-gray-500 mt-2">Crafting a professional pirate-themed announcement for your event.</p>
          </div>
        )}

        {step === 'preview' && (
          <div className="p-0">
            <div className="bg-gray-100 p-4 flex justify-between items-center border-b">
              <div className="flex items-center text-sm text-gray-600 font-medium">
                <Mail className="w-4 h-4 mr-2" />
                Email Preview for Subscribers
              </div>
              <button onClick={() => setStep('form')} className="text-ecu-purple text-sm font-bold hover:underline">Edit Event</button>
            </div>
            <div className="p-8 max-h-[400px] overflow-y-auto">
              <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-inner font-sans whitespace-pre-line text-gray-700 leading-relaxed">
                {draftedEmail}
              </div>
            </div>
            <div className="p-6 bg-gray-50 flex gap-4">
               <button 
                onClick={handleSendEmails}
                className="flex-1 bg-ecu-purple text-white py-4 rounded-xl font-bold hover:bg-ecu-darkPurple transition-all shadow-lg flex items-center justify-center"
               >
                 <Send className="w-5 h-5 mr-2" />
                 Post Event & Notify All Alumni
               </button>
            </div>
          </div>
        )}

        {step === 'sending' && (
          <div className="p-12 text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-ecu-gold border-t-ecu-purple rounded-full animate-spin"></div>
              <Mail className="absolute inset-0 m-auto w-8 h-8 text-ecu-purple" />
            </div>
            <h3 className="text-xl font-bold text-ecu-darkPurple font-serif">Dispatched to the Network</h3>
            <p className="text-gray-500 mt-2">Sending emails to 452 subscribed Pirates...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-ecu-darkPurple font-serif mb-2">Event Live & Notified!</h2>
            <p className="text-gray-600 mb-8">
              Your event has been added to the calendar and an announcement was emailed to all active subscribers.
            </p>
            <button 
              onClick={reset}
              className="w-full bg-ecu-purple text-white py-3 rounded-xl font-bold hover:bg-ecu-darkPurple transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddEventModal;