import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Heart } from 'lucide-react';

interface FooterProps {
  onDonateClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onDonateClick }) => {
  return (
    <footer className="bg-ecu-darkPurple text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4 text-ecu-gold">ECU DECA Alumni</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering alumni to connect, grow, and support the next generation of business leaders at East Carolina University.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-ecu-gold transition-colors">Become a Mentor</a></li>
              <li>
                <button 
                  onClick={onDonateClick}
                  className="hover:text-ecu-gold transition-colors flex items-center text-left"
                >
                  <Heart className="w-3 h-3 mr-1 text-ecu-gold fill-ecu-gold" />
                  Donate to Chapter
                </button>
              </li>
              <li><a href="mailto:ecudecaalumni@gmail.com?subject=Alumni%20Update" className="hover:text-ecu-gold transition-colors">Submit an Update</a></li>
              <li><a href="mailto:ecudecaalumni@gmail.com" className="hover:text-ecu-gold transition-colors">Contact Board</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-ecu-gold transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-ecu-gold transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-ecu-gold transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-ecu-gold transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              © {new Date().getFullYear()} ECU DECA Alumni Association. <br/> Not officially affiliated with ECU Administration.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;