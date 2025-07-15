import React from 'react';
import { Car, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t-4 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-brutal-yellow p-2 border-2 border-white shadow-brutal">
                <Car className="h-6 w-6 text-black" />
              </div>
              <div className="font-mono font-black text-xl text-white tracking-wider">
                BRUTAL<span className="text-brutal-yellow">MOTORS</span>
              </div>
            </div>
            <p className="font-mono text-gray-300 mb-4 max-w-md">
              THE MOST AGGRESSIVE CAR DEALERSHIP IN THE CITY. WE DON'T JUST SELL CARS, WE DELIVER EXPERIENCES THAT HIT DIFFERENT.
            </p>
            <div className="flex space-x-4">
              <div className="bg-brutal-pink p-2 border-2 border-white shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 cursor-pointer">
                <div className="w-6 h-6 bg-black"></div>
              </div>
              <div className="bg-brutal-cyan p-2 border-2 border-white shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 cursor-pointer">
                <div className="w-6 h-6 bg-black"></div>
              </div>
              <div className="bg-brutal-green p-2 border-2 border-white shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 cursor-pointer">
                <div className="w-6 h-6 bg-black"></div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono font-black text-lg mb-4 text-brutal-yellow">QUICK LINKS</h3>
            <ul className="space-y-2 font-mono">
              <li><a href="/inventory" className="hover:text-brutal-yellow transition-colors">INVENTORY</a></li>
              <li><a href="/about" className="hover:text-brutal-yellow transition-colors">ABOUT US</a></li>
              <li><a href="/contact" className="hover:text-brutal-yellow transition-colors">CONTACT</a></li>
              <li><a href="/auth" className="hover:text-brutal-yellow transition-colors">LOGIN</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-mono font-black text-lg mb-4 text-brutal-yellow">CONTACT INFO</h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-brutal-cyan" />
                <span>+1 (555) BRUTAL-1</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-brutal-pink" />
                <span>INFO@BRUTALMOTORS.COM</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-brutal-green" />
                <span>123 BRUTAL ST, CITY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-white mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-mono text-gray-400 text-sm">
              © 2024 BRUTAL MOTORS. ALL RIGHTS RESERVED.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 font-mono text-sm">
              <a href="#" className="hover:text-brutal-yellow transition-colors">PRIVACY POLICY</a>
              <a href="#" className="hover:text-brutal-yellow transition-colors">TERMS OF SERVICE</a>
              <a href="#" className="hover:text-brutal-yellow transition-colors">GDPR COMPLIANCE</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
