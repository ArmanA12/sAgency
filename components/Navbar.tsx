import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navItems = [
  { label: 'About us', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Stats', href: '#our-stats' },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="py-4 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-white text-black font-extrabold px-2 py-0.5 text-lg">X</div>
          <span className="font-bold tracking-widest text-white">METHOD</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-white text-black px-4 py-2 text-sm font-bold hover:bg-gray-200 transition-colors rounded-sm">
            <span>Contact us</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-dark border-b border-white/10 p-6 flex flex-col space-y-4 md:hidden h-screen z-50">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-2xl font-display font-medium text-gray-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button className="w-full bg-white text-black py-4 text-lg font-bold mt-8 rounded-sm">
            Contact us
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;