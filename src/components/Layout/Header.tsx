import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-black border-b-4 border-white relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-brutal-yellow p-2 border-2 border-black shadow-brutal transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all duration-200">
              <Car className="h-8 w-8 text-black" />
            </div>
            <div className="font-mono font-black text-2xl text-white tracking-wider">
              BRUTAL<span className="text-brutal-yellow">MOTORS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/inventory" className="font-mono font-bold text-white hover:text-brutal-yellow transition-colors duration-200 text-lg">
              INVENTORY
            </Link>
            <Link to="/about" className="font-mono font-bold text-white hover:text-brutal-yellow transition-colors duration-200 text-lg">
              ABOUT
            </Link>
            <Link to="/contact" className="font-mono font-bold text-white hover:text-brutal-yellow transition-colors duration-200 text-lg">
              CONTACT
            </Link>
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-brutal-cyan text-black px-4 py-2 border-2 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 font-mono font-bold"
                >
                  <User className="h-5 w-5" />
                  <span>{user.name.split(' ')[0].toUpperCase()}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black shadow-brutal-lg">
                    <div className="py-2">
                      <Link
                        to="/appointments"
                        className="block px-4 py-2 text-black hover:bg-brutal-yellow font-mono font-bold"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        MY APPOINTMENTS
                      </Link>
                      {user.isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-black hover:bg-brutal-pink font-mono font-bold"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          ADMIN PANEL
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-black hover:bg-red-200 font-mono font-bold flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>LOGOUT</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-brutal-green text-black px-6 py-2 border-2 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 font-mono font-bold text-lg"
              >
                LOGIN
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden bg-white p-2 border-2 border-black shadow-brutal"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-black border-b-4 border-white">
            <nav className="px-4 py-6 space-y-4">
              <Link
                to="/inventory"
                className="block font-mono font-bold text-white hover:text-brutal-yellow text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                INVENTORY
              </Link>
              <Link
                to="/about"
                className="block font-mono font-bold text-white hover:text-brutal-yellow text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                className="block font-mono font-bold text-white hover:text-brutal-yellow text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </Link>
              
              {user ? (
                <div className="space-y-2 pt-4 border-t border-gray-600">
                  <div className="text-brutal-cyan font-mono font-bold text-lg">
                    {user.name.toUpperCase()}
                  </div>
                  <Link
                    to="/appointments"
                    className="block font-mono font-bold text-white hover:text-brutal-yellow text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    MY APPOINTMENTS
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="block font-mono font-bold text-white hover:text-brutal-pink text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ADMIN PANEL
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="font-mono font-bold text-white hover:text-red-400 text-lg flex items-center space-x-2"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>LOGOUT</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="block bg-brutal-green text-black px-6 py-3 border-2 border-black shadow-brutal font-mono font-bold text-xl text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  LOGIN
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
