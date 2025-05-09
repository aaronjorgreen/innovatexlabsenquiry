import React, { useState, useEffect } from 'react';
import { Menu, X, Beaker } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-center items-center relative">
          {/* Mobile menu button - absolute positioned on the left */}
          <div className="md:hidden absolute left-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-orange-400 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Centered logo */}
          <div className="flex items-center">
            <Beaker className="h-8 w-8 text-orange-500 mr-2" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Innovate X Labs
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-black shadow-xl absolute w-full">
          <div className="flex flex-col space-y-4 p-4">
            <a
              href="#about"
              className="text-white hover:text-orange-400 transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#services"
              className="text-white hover:text-orange-400 transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a
              href="#testimonials"
              className="text-white hover:text-orange-400 transition-colors font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;