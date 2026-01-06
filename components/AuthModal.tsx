import React, { useState } from 'react';
import { X, User, Lock, Mail, Briefcase, GraduationCap, Award, FileText, Calendar, MapPin } from 'lucide-react';
import { Alumni, Event } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
  onSignup: (data: Omit<Alumni, 'id'>) => void;
  currentUser?: Alumni | null;
  userEvents?: Event[];
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onLogin, 
  onSignup, 
  currentUser, 
  userEvents = [] 
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    gradYear: new Date().getFullYear(),
    company: '',
    role: '',
    bio: '',
    achievement: '',
    imageUrl: `https://ui-avatars.com/api/?background=592A8A&color=fff&name=`
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(formData.email);
    } else {
      if (!formData.name || !formData.email) return;
      
      onSignup({
        name: formData.name,
        email: formData.email,
        gradYear: Number(formData.gradYear),
        company: formData.company,
        role: formData.role,
        bio: formData.bio || 'Proud ECU DECA Alum.',
        achievement: formData.achievement || 'Joined the ECU DECA Alumni Network.',
        imageUrl: `https://ui-avatars.com/api/?background=592A8A&color=fff&name=${encodeURIComponent(formData.name)}`,
        rsvpedEventIds: []
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // If user is already logged in, show their profile summary and events
  if (currentUser) {
    return (
      <div className="fixed inset-0 z-[60] overflow-y-auto" role="dialog" aria-modal="true">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" onClick={onClose}></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
          
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
            <div className="bg-ecu-purple p-6 text-white flex justify-between items-start">
               <div>
                 <h3 className="text-2xl font-bold font-serif">{currentUser.name}</h3>
                 <p className="text-ecu-lightGold text-sm">Class of {currentUser.gradYear}</p>
               </div>
               <button onClick={onClose} className="bg-white/10 rounded-full p-1 hover:bg-white/20">
                 <X className="h-6 w-6" />
               </button>
            </div>
            
            <div className="p-6">
               <div className="flex items-center mb-6">
                 <img src={currentUser.imageUrl} className="w-16 h-16 rounded-full border-4 border-white shadow-md -mt-10 bg-white" alt="Profile" />
                 <div className="ml-4 -mt-2">
                    <p className="font-semibold text-gray-900">{currentUser.role}</p>
                    <p className="text-gray-500 text-sm">{currentUser.company}</p>
                 </div>
               </div>

               <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                 <Calendar className="w-5 h-5 mr-2 text-ecu-purple" />
                 My Upcoming Events ({userEvents.length})
               </h4>
               
               <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                 {userEvents.length > 0 ? (
                   userEvents.map(event => (
                     <div key={event.id} className="border border-gray-200 rounded-lg p-3 hover:border-ecu-purple transition-colors bg-gray-50">
                        <div className="flex justify-between items-start">
                           <h5 className="font-bold text-gray-800 text-sm">{event.title}</h5>
                           <span className="text-xs font-bold text-ecu-purple bg-ecu-purple/10 px-2 py-0.5 rounded">Going</span>
                        </div>
                        <div className="mt-2 flex items-center text-xs text-gray-500 space-x-3">
                           <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {event.date}</span>
                           <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {event.location}</span>
                        </div>
                     </div>
                   ))
                 ) : (
                   <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                     <p>You haven't RSVP'd to any events yet.</p>
                     <button onClick={onClose} className="mt-2 text-ecu-purple font-bold text-sm hover:underline">Browse Events</button>
                   </div>
                 )}
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login/Signup Form
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button onClick={onClose} className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[80vh] overflow-y-auto">
            <div className="sm:flex sm:items-start w-full">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-2xl leading-6 font-bold text-ecu-darkPurple font-serif mb-6" id="modal-title">
                  {isLogin ? 'Welcome Back, Alum!' : 'Join the Network'}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            required
                            className="focus:ring-ecu-purple focus:border-ecu-purple block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                            placeholder="PeeDee Pirate"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm font-medium text-gray-700">Grad Year</label>
                           <div className="mt-1 relative rounded-md shadow-sm">
                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                               <GraduationCap className="h-4 w-4 text-gray-400" />
                             </div>
                             <input
                               type="number"
                               name="gradYear"
                               required
                               className="focus:ring-ecu-purple focus:border-ecu-purple block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                               value={formData.gradYear}
                               onChange={handleChange}
                             />
                           </div>
                        </div>
                         <div>
                           <label className="block text-sm font-medium text-gray-700">Current Role</label>
                           <div className="mt-1 relative rounded-md shadow-sm">
                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                               <Briefcase className="h-4 w-4 text-gray-400" />
                             </div>
                             <input
                               type="text"
                               name="role"
                               required
                               className="focus:ring-ecu-purple focus:border-ecu-purple block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                               placeholder="Manager"
                               value={formData.role}
                               onChange={handleChange}
                             />
                           </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Company</label>
                        <input
                          type="text"
                          name="company"
                          required
                          className="mt-1 focus:ring-ecu-purple focus:border-ecu-purple block w-full sm:text-sm border-gray-300 rounded-md py-2 border px-3"
                          placeholder="Company Name"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Short Bio</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                           <div className="absolute top-2.5 left-3 pointer-events-none">
                             <FileText className="h-4 w-4 text-gray-400" />
                           </div>
                           <textarea
                             name="bio"
                             rows={2}
                             required
                             className="focus:ring-ecu-purple focus:border-ecu-purple block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border px-3"
                             placeholder="Tell us about your journey since ECU..."
                             value={formData.bio}
                             onChange={handleChange}
                           />
                         </div>
                      </div>

                      <div>
                         <label className="block text-sm font-medium text-gray-700">Highlight Achievement</label>
                         <div className="mt-1 relative rounded-md shadow-sm">
                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                             <Award className="h-4 w-4 text-gray-400" />
                           </div>
                           <input
                             type="text"
                             name="achievement"
                             required
                             className="focus:ring-ecu-purple focus:border-ecu-purple block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                             placeholder="Promoted to Senior VP..."
                             value={formData.achievement}
                             onChange={handleChange}
                           />
                         </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        className="focus:ring-ecu-purple focus:border-ecu-purple block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        required
                        className="focus:ring-ecu-purple focus:border-ecu-purple block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ecu-purple hover:bg-ecu-darkPurple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ecu-purple mt-6 transition-colors"
                  >
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 font-medium text-ecu-purple hover:text-ecu-darkPurple"
              >
                {isLogin ? 'Sign up now' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;