import { useState, useEffect } from 'react';
import { Menu, X, Search, Heart } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Ministries', href: '#ministries' },
    { name: 'Sermons', href: '#sermons' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#footer' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className={`text-2xl font-bold font-serif uppercase tracking-wider ${scrolled ? 'text-secondary' : 'text-white'}`}>
              Zegen<span className="text-primary">.</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wide transition-colors ${
                  scrolled ? 'text-gray-800 hover:text-primary' : 'text-gray-100 hover:text-primary'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button className="text-primary hover:text-primary/80 transition-colors">
              <Search size={20} />
            </button>
            <a
              href="#donate"
              className="px-5 py-2.5 bg-primary text-white text-sm font-bold uppercase rounded hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <Heart size={16} fill="currentColor" /> Donate
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${scrolled ? 'text-gray-800' : 'text-white'} hover:text-primary focus:outline-none`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full top-full left-0">
          <div className="px-4 pt-4 pb-8 space-y-2 flex flex-col items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-gray-800 hover:text-primary uppercase"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#donate"
              onClick={() => setIsOpen(false)}
              className="mt-4 px-6 py-3 bg-primary text-white text-sm font-bold uppercase rounded hover:bg-red-600 transition-colors w-full text-center"
            >
              Donate Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
