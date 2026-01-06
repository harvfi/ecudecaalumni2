import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, UserCircle, LogOut, Bell, BellRing, BellOff, PlusCircle } from 'lucide-react';
import { Alumni } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: Alumni | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onAddEventClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  onLoginClick, 
  onLogoutClick,
  onAddEventClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setNotifPermission(Notification.permission);
    }
  }, []);

  const requestNotifPermission = async () => {
    if (!('Notification' in window)) return;
    const permission = await Notification.requestPermission();
    setNotifPermission(permission);
    
    if (permission === 'granted') {
      new Notification('Go Pirates!', {
        body: 'You have enabled ECU DECA Alumni notifications.',
        icon: 'https://ui-avatars.com/api/?background=592A8A&color=fff&name=ECU'
      });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Events', id: 'events' },
    { name: 'Alumni Spotlight', id: 'spotlight' },
    { name: 'Chapter News', id: 'news' },
  ];

  return (
    <nav className="bg-ecu-purple text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-ecu-gold p-1.5 rounded-full">
               <GraduationCap className="h-6 w-6 text-ecu-purple" />
            </div>
            <span className="font-bold text-xl tracking-tight font-serif">ECU DECA Alumni</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === link.id
                      ? 'bg-ecu-darkPurple text-ecu-gold'
                      : 'hover:bg-ecu-darkPurple hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              ))}

              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-ecu-darkPurple">
                {/* Global Add Event Button (Visible if logged in) */}
                {currentUser && (
                  <button 
                    onClick={onAddEventClick}
                    className="flex items-center px-3 py-1.5 rounded-lg bg-ecu-gold text-ecu-purple text-xs font-bold hover:bg-white transition-all shadow-sm"
                    title="Create New Event"
                  >
                    <PlusCircle className="w-4 h-4 mr-1.5" />
                    Add Event
                  </button>
                )}

                {/* Notification Bell */}
                <button 
                  onClick={requestNotifPermission}
                  className="p-2 rounded-full hover:bg-ecu-darkPurple transition-colors relative group"
                  title="Enable Event Notifications"
                >
                  {notifPermission === 'granted' ? (
                    <BellRing className="w-5 h-5 text-ecu-gold animate-pulse" />
                  ) : notifPermission === 'denied' ? (
                    <BellOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Bell className="w-5 h-5 text-ecu-lightGold group-hover:text-white" />
                  )}
                  {notifPermission === 'default' && (
                    <span className="absolute top-1 right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ecu-gold opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-ecu-gold"></span>
                    </span>
                  )}
                </button>

                {currentUser ? (
                  <div className="flex items-center space-x-3 group relative">
                    <div className="flex items-center space-x-2">
                       <span className="text-sm font-medium text-ecu-lightGold">Hi, {currentUser.name.split(' ')[0]}</span>
                       <img 
                          src={currentUser.imageUrl} 
                          alt="Profile" 
                          className="h-8 w-8 rounded-full border-2 border-ecu-gold object-cover"
                       />
                    </div>
                    <button 
                      onClick={onLogoutClick}
                      className="text-xs bg-ecu-darkPurple hover:bg-red-900 text-white px-2 py-1 rounded transition-colors flex items-center"
                    >
                      <LogOut className="w-3 h-3 mr-1" /> Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onLoginClick}
                    className="flex items-center px-4 py-2 rounded-full bg-ecu-gold text-ecu-purple text-sm font-bold hover:bg-white transition-all shadow-sm"
                  >
                    <UserCircle className="w-4 h-4 mr-1.5" />
                    Login / Join
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-ecu-gold hover:text-white hover:bg-ecu-darkPurple focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-ecu-darkPurple">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === link.id
                    ? 'bg-ecu-purple text-ecu-gold'
                    : 'text-white hover:bg-ecu-purple'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="border-t border-ecu-purple mt-2 pt-2 space-y-1">
              {currentUser && (
                <button 
                  onClick={() => {
                    onAddEventClick();
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-ecu-gold hover:bg-ecu-purple"
                >
                  <PlusCircle className="w-5 h-5 mr-2" /> 
                  Create New Event
                </button>
              )}
              <button 
                onClick={requestNotifPermission}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-ecu-lightGold hover:bg-ecu-purple"
              >
                <Bell className="w-5 h-5 mr-2" /> 
                {notifPermission === 'granted' ? 'Notifications Enabled' : 'Enable Notifications'}
              </button>
              {currentUser ? (
                 <button
                 onClick={() => {
                   onLogoutClick();
                   setIsOpen(false);
                 }}
                 className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-red-900/20"
               >
                 Sign Out ({currentUser.name})
               </button>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-ecu-gold hover:bg-ecu-purple"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;