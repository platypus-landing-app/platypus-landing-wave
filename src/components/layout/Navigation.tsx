import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openTrialBooking } = useBooking();
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
<nav className="fixed top-0 left-0 right-0 z-50 
  bg-background/95 supports-[backdrop-filter]:bg-background/80 
  backdrop-blur-md border-b border-border/50 
  shadow-md transition-all duration-300">
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between items-center h-[70px] md:h-[80px] py-2">

  {/* Logo */}
  <div className="flex items-center -ml-5">
    <div 
      className="cursor-pointer"
      onClick={() => handleScrollTo('#home')}
      style={{ background: 'transparent', boxShadow: 'none', borderRadius: 0 }}
    >
      <img 
        src="/logo.png" 
        alt="Logo" 
        className="block w-full max-w-[160px] h-auto"
      />
    </div>
  </div>

  {/* Desktop Navigation */}
  <div className="hidden md:flex items-center space-x-0 ml-[60px]">
    {navItems.map((item) => (
      <button
        key={item.name}
        onClick={() => handleScrollTo(item.href)}
        className={`px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap relative hover:text-[#0088FF] ${
          activeSection === item.href.substring(1) 
            ? 'text-[#0088FF]' 
            : 'text-gray-700'
        }`}
      >
        {item.name}
        {activeSection === item.href.substring(1) && (
          <div className="absolute bottom-0 left-0 right-0 mx-auto w-[80%] h-0.5 bg-[#0088FF]"></div>
        )}
      </button>
    ))}
  </div>

  {/* Right side: Trial Button (desktop) + Hamburger (mobile) */}
  <div className="flex items-center space-x-4">
    {/* Trial Button - Desktop only */}
    <div className="hidden md:block">
      <Button 
        onClick={openTrialBooking}
        className="bg-[#397CEF] hover:bg-[#397CEF] text-white px-6 py-3 rounded font-medium transition-all duration-200 hover:shadow-lg hover:scale-105"
      >
        BOOK TRIAL NOW
      </Button>
    </div>

    {/* Hamburger - Mobile only */}
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 text-gray-700 hover:text-[#0088FF] focus:outline-none"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  </div>
</div>

  </div>

  {/* Mobile Navigation */}
  {/* Mobile Navigation */}
{isOpen && (
  <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg z-40">
    <div className="px-4 pt-4 pb-6 space-y-2">
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => handleScrollTo(item.href)}
          className="w-full text-left text-gray-700 hover:text-[#0088FF] font-medium block px-3 py-2 rounded-md transition-colors"
        >
          {item.name}
        </button>
      ))}
      <div className="pt-4">
        <Button 
          onClick={openTrialBooking}
          className="w-full bg-[#397CEF] hover:bg-[#0088FF] text-white py-3 rounded font-medium"
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