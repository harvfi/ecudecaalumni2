import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventCard from './components/EventCard';
import SpotlightCard from './components/SpotlightCard';
import NewsCard from './components/NewsCard';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import AuthModal from './components/AuthModal';
import DonationModal from './components/DonationModal';
import AddEventModal from './components/AddEventModal';
import RSVPModal from './components/RSVPModal';
import { MOCK_ALUMNI, MOCK_EVENTS, MOCK_NEWS } from './constants';
import { Alumni, Event } from './types';
import { Bell, Plus } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [alumniList, setAlumniList] = useState<Alumni[]>(MOCK_ALUMNI);
  const [eventsList, setEventsList] = useState<Event[]>(MOCK_EVENTS);
  const [currentUser, setCurrentUser] = useState<Alumni | null>(null);
  
  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false);
  const [selectedEventForRSVP, setSelectedEventForRSVP] = useState<Event | null>(null);

  const handleLogin = (email: string) => {
    const existingUser = alumniList.find(a => a.email === email);
    if (existingUser) {
      setCurrentUser(existingUser);
    } else {
      const newUser = {
         id: Date.now().toString(),
         name: 'Alumni Member',
         email: email,
         gradYear: 2024,
         company: 'Pending...',
         role: 'Member',
         bio: 'Welcome back!',
         imageUrl: 'https://ui-avatars.com/api/?background=592A8A&color=fff&name=Member',
         achievement: 'Logged in successfully',
         isSubscribed: true,
         rsvpedEventIds: []
      };
      setAlumniList(prev => [...prev, newUser]);
      setCurrentUser(newUser);
    }
    setIsAuthOpen(false);
  };

  const handleSignup = (data: Omit<Alumni, 'id'>) => {
    const newUser: Alumni = {
      ...data,
      id: Date.now().toString(),
      isSubscribed: true,
      rsvpedEventIds: []
    };
    setAlumniList(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsAuthOpen(false);
    setActiveTab('spotlight');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  const handleEventCreated = (newEvent: Event) => {
    setEventsList(prev => [newEvent, ...prev]);
    setActiveTab('events');
  };

  // RSVP Logic
  const handleRSVPRequest = (event: Event) => {
    if (currentUser) {
      // If logged in, RSVP immediately
      processRSVP(currentUser.email!, event.id);
    } else {
      // If not logged in, open RSVP Modal
      setSelectedEventForRSVP(event);
      setIsRSVPModalOpen(true);
    }
  };

  const processRSVP = (email: string, eventId: string) => {
    // Check if user exists
    const existingUserIndex = alumniList.findIndex(a => a.email === email);
    
    if (existingUserIndex >= 0) {
       // Update existing user
       const updatedAlumni = [...alumniList];
       const user = updatedAlumni[existingUserIndex];
       
       if (!user.rsvpedEventIds) user.rsvpedEventIds = [];
       
       if (!user.rsvpedEventIds.includes(eventId)) {
         user.rsvpedEventIds.push(eventId);
         setAlumniList(updatedAlumni);
         
         // If this is the currently logged in user, update local state too
         if (currentUser && currentUser.id === user.id) {
            setCurrentUser({...user});
         }
       }
    } else {
      // Create a "Lead" or "Guest" account for tracking
      const guestUser: Alumni = {
        id: Date.now().toString(),
        name: 'Guest Alum',
        email: email,
        gradYear: 2024,
        company: 'N/A',
        role: 'Guest',
        imageUrl: `https://ui-avatars.com/api/?background=592A8A&color=fff&name=G`,
        bio: 'Visiting Guest',
        achievement: 'RSVPed to event',
        rsvpedEventIds: [eventId]
      };
      setAlumniList(prev => [...prev, guestUser]);
    }
    
    setIsRSVPModalOpen(false);
    setSelectedEventForRSVP(null);
  };

  // Helper to get actual event objects for the current user's history
  const getUserEvents = () => {
    if (!currentUser || !currentUser.rsvpedEventIds) return [];
    return eventsList.filter(e => currentUser.rsvpedEventIds?.includes(e.id));
  };

  const isUserRSVPed = (eventId: string) => {
    return currentUser?.rsvpedEventIds?.includes(eventId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero onJoinClick={() => setActiveTab('events')} />
            
            <div className="bg-white py-8 border-b">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                  <div className="flex items-center group cursor-pointer" onClick={() => {
                    if ('Notification' in window) Notification.requestPermission();
                  }}>
                    <div className="bg-ecu-purple/10 p-2 rounded-full mr-3 group-hover:bg-ecu-purple group-hover:text-white transition-all">
                      <Bell className="w-5 h-5 text-ecu-purple group-hover:text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-ecu-darkPurple leading-none">Enable Pirate Alerts</p>
                      <p className="text-xs text-gray-500">Never miss a networking event</p>
                    </div>
                  </div>
                  <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
                  <button 
                    onClick={() => setIsDonationOpen(true)}
                    className="flex items-center px-6 py-2 bg-ecu-gold text-ecu-purple rounded-full font-bold hover:shadow-md transition-all animate-pulse"
                  >
                    Donate to Student Travel Fund ✈️
                  </button>
                  {currentUser && (
                    <>
                      <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
                      <button 
                        onClick={() => setIsAddEventOpen(true)}
                        className="flex items-center px-6 py-2 bg-ecu-purple text-white rounded-full font-bold hover:bg-ecu-darkPurple transition-all shadow-sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Event
                      </button>
                    </>
                  )}
               </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-ecu-darkPurple font-serif">Chapter Updates</h2>
                <p className="mt-4 text-lg text-gray-600">See what's happening on campus and within our network.</p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                {MOCK_NEWS.map(item => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="bg-ecu-purple bg-opacity-5 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-ecu-darkPurple font-serif">Don't Miss Out</h2>
                    <button 
                      onClick={() => setActiveTab('events')}
                      className="mt-4 md:mt-0 text-ecu-purple font-semibold hover:text-ecu-darkPurple flex items-center"
                    >
                      View All Events &rarr;
                    </button>
                 </div>
                 <div className="grid gap-8 md:grid-cols-3">
                    {eventsList.slice(0, 3).map(event => (
                      <EventCard 
                        key={event.id} 
                        event={event} 
                        isRSVPed={isUserRSVPed(event.id)}
                        onRSVPClick={handleRSVPRequest}
                      />
                    ))}
                 </div>
              </div>
            </div>
          </>
        );

      case 'events':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
             <div className="mb-10 border-b border-gray-200 pb-5 flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 font-serif">Upcoming Alumni Events</h2>
                  <p className="mt-2 text-gray-600">Reconnect with old friends and expand your professional network.</p>
                </div>
                <div className="flex gap-3">
                  {currentUser && (
                    <button 
                      onClick={() => setIsAddEventOpen(true)}
                      className="bg-ecu-purple text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-ecu-darkPurple flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Event
                    </button>
                  )}
                  {!currentUser && (
                    <button onClick={() => setIsAuthOpen(true)} className="bg-ecu-gold text-ecu-purple px-4 py-2 rounded-lg font-bold text-sm hover:bg-yellow-400">
                      Join to RSVP
                    </button>
                  )}
                </div>
             </div>
             <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {eventsList.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    isRSVPed={isUserRSVPed(event.id)}
                    onRSVPClick={handleRSVPRequest}
                  />
                ))}
             </div>
          </div>
        );

      case 'spotlight':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
             <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-gray-900 font-serif">Alumni Hall of Fame</h2>
                <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Celebrating the diverse achievements of our Pirate graduates across industries.</p>
                {currentUser && (
                  <div className="mt-4 p-2 bg-green-50 text-green-700 text-sm inline-block rounded-lg border border-green-200">
                     Your profile is now visible to the network!
                  </div>
                )}
             </div>
             <div className="space-y-12">
                {alumniList.map(alum => (
                  <SpotlightCard key={alum.id} alumni={alum} />
                ))}
             </div>
          </div>
        );

      case 'news':
        return (
           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
             <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 font-serif">News & Announcements</h2>
             </div>
             <div className="space-y-6">
                {MOCK_NEWS.map(item => (
                  <NewsCard key={item.id} item={item} />
                ))}
                <div className="p-6 bg-gray-50 rounded-lg text-center border border-dashed border-gray-300">
                  <p className="text-gray-500">More updates coming soon...</p>
                </div>
             </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentUser={currentUser}
        onLoginClick={() => setIsAuthOpen(true)}
        onLogoutClick={handleLogout}
        onAddEventClick={() => setIsAddEventOpen(true)}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer onDonateClick={() => setIsDonationOpen(true)} />
      <ChatWidget />
      
      {/* Modals */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
        currentUser={currentUser}
        userEvents={getUserEvents()}
      />

      <DonationModal 
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
      />

      <AddEventModal 
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        onEventCreated={handleEventCreated}
      />

      <RSVPModal 
        isOpen={isRSVPModalOpen}
        onClose={() => setIsRSVPModalOpen(false)}
        event={selectedEventForRSVP}
        onConfirm={(email) => selectedEventForRSVP && processRSVP(email, selectedEventForRSVP.id)}
      />
    </div>
  );
}

export default App;