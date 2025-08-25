import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'GUARDIANS', href: '#home' },
    { name: 'WHY PLATYPUS', href: '#features' },
    { name: 'AREAS WE SERVE', href: '#areas' },
    { name: 'PROCESS', href: '#process' },
    { name: 'TESTIMONIALS', href: '#testimonials' },
  ];

  // Smooth scroll function
  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  // Active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'areas', 'process', 'testimonials'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="text-3xl font-bold text-black cursor-pointer" onClick={() => handleScrollTo('#home')}>
              Platypus
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleScrollTo(item.href)}
                  className={`px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap relative hover:text-blue-600 ${
                    activeSection === item.href.substring(1) 
                      ? 'text-blue-600' 
                      : 'text-gray-700'
                  }`}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Button 
              onClick={() => handleScrollTo('#testimonials')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-md font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              BOOK TRIAL NOW
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleScrollTo(item.href)}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-3 rounded-md text-base font-medium w-full text-left transition-colors"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4">
              <Button 
                onClick={() => handleScrollTo('#testimonials')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
              >
                BOOK TRIAL NOW
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;