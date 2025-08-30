import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import About from '@/components/sections/About';
import AreasWeServe from '@/components/sections/AreasWeServe';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/layout/Footer';
import HeroFeatures from '@/components/sections/HeroFeatures';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <HeroFeatures />
      <Features />
      <About />
      <AreasWeServe />
      <Process />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
