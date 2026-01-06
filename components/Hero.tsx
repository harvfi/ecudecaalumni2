import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onJoinClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onJoinClick }) => {
  return (
    <div className="relative bg-ecu-darkPurple overflow-hidden">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src="https://picsum.photos/1600/900?random=20"
          alt="ECU Campus"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ecu-purple to-transparent mix-blend-multiply" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl font-serif">
          Legacy of Leadership
        </h1>
        <p className="mt-6 text-xl text-ecu-lightGold max-w-3xl">
          Connecting East Carolina University DECA alumni to empower the next generation of leaders. Stay engaged, share your success, and support the chapter.
        </p>
        <div className="mt-10 max-w-sm sm:flex sm:max-w-none">
          <button
            onClick={onJoinClick}
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-ecu-purple bg-ecu-gold hover:bg-white hover:text-ecu-purple md:py-4 md:text-lg md:px-10 transition-colors shadow-lg"
          >
            Explore Events
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;