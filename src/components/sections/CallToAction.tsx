import { Phone, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ctaImage from '@/assets/cta-image.jpg';

const CallToAction = () => {
  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="py-28 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Image */}
        <div className="text-center mb-20">
          <div className="max-w-3xl mx-auto">
            <img 
              src={ctaImage} 
              alt="Dog walker with golden retriever" 
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </div>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Ready to Book Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 text-center border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Book?
            </h3>
            <p className="text-lg text-gray-600 mb-8 font-medium">
              Available 7 days a week, 8 AM - 8 PM
            </p>
            <Button 
              onClick={() => window.open('tel:+918451880963')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-6 h-6" />
              <span className="text-lg font-medium">Call us: +91 84518 80963</span>
            </Button>
          </div>

          {/* App Early Access Card */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-10 text-center border border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Get App Early Access
            </h3>
            <p className="text-lg text-gray-600 mb-2 font-medium">
              Be first to download in August 2025
            </p>
            <Button 
              onClick={() => handleScrollTo('#testimonials')}
              variant="outline"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-2xl flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Smartphone className="w-6 h-6" />
              <span className="text-lg font-medium">Join our waitlist today</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;