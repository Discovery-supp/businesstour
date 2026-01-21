import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Briefcase } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/tours', label: t('nav.tours') },
    { path: '/booking', label: t('nav.booking') },
    { path: '/salons', label: t('nav.salons') },
    { path: '/testimonials', label: t('nav.testimonials') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/admin', label: t('nav.admin') },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-[#0a0e27] shadow-lg fixed w-full top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white">Business Tours</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  isActive(item.path)
                    ? 'text-pink-500 font-semibold'
                    : 'text-gray-300 hover:text-pink-500'
                } transition-colors`}
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="mr-2 p-2 rounded-lg hover:bg-gray-800 text-gray-300"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0a0e27] border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`${
                  isActive(item.path)
                    ? 'bg-pink-500/20 text-pink-500'
                    : 'text-gray-300 hover:bg-gray-800'
                } block w-full text-left px-3 py-2 rounded-lg transition-colors`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
