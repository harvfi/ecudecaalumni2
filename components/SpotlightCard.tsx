import React from 'react';
import { Award, Briefcase } from 'lucide-react';
import { Alumni } from '../types';

interface SpotlightCardProps {
  alumni: Alumni;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ alumni }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-ecu-gold flex flex-col md:flex-row">
      <div className="md:w-1/3 relative">
        <img 
          src={alumni.imageUrl} 
          alt={alumni.name} 
          className="h-full w-full object-cover min-h-[250px]"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ecu-purple to-transparent p-4 md:hidden">
            <h3 className="text-white font-bold text-xl">{alumni.name}</h3>
            <p className="text-ecu-gold text-sm">Class of {alumni.gradYear}</p>
        </div>
      </div>
      <div className="p-6 md:w-2/3 flex flex-col justify-center">
        <div className="hidden md:block mb-4">
            <h3 className="text-2xl font-bold text-gray-900 font-serif">{alumni.name}</h3>
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mt-1">
                Class of {alumni.gradYear}
            </span>
        </div>
        
        <div className="flex items-start mb-4">
            <Briefcase className="w-5 h-5 text-ecu-purple mr-2 mt-1 flex-shrink-0" />
            <div>
                <p className="font-semibold text-gray-900">{alumni.role}</p>
                <p className="text-gray-600">{alumni.company}</p>
            </div>
        </div>

        <div className="mb-4">
            <p className="text-gray-700 italic">"{alumni.bio}"</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <div className="flex items-center text-ecu-darkPurple font-bold mb-1">
                <Award className="w-5 h-5 mr-2" />
                Latest Achievement
            </div>
            <p className="text-gray-800 text-sm">{alumni.achievement}</p>
        </div>
      </div>
    </div>
  );
};

export default SpotlightCard;