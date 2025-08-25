import { Phone, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ctaImage from '@/assets/cta-image.jpg';

const CallToAction = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Image */}
        <div className="text-center mb-16">
          <div className="max-w-2xl mx-auto">
            <img 
              src={ctaImage} 
              alt="Dog walker with golden retriever" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Ready to Book Card */}
          <div className="bg-blue-50 rounded-2xl p-8 text-center border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Book?
            </h3>
            <p className="text-gray-600 mb-6">
              Available 7 days a week, 8 AM - 8 PM
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 mx-auto"
            >
              <Phone className="w-5 h-5" />
              <span>Call us: +91 84518 80963</span>
            </Button>
          </div>

          {/* App Early Access Card */}
          <div className="bg-orange-50 rounded-2xl p-8 text-center border border-orange-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Get App Early Access
            </h3>
            <p className="text-gray-600 mb-2">
              Be first to download in August 2025
            </p>
            <Button 
              variant="outline"
              className="border-orange-500 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-full flex items-center space-x-2 mx-auto"
            >
              <Smartphone className="w-5 h-5" />
              <span>Join our waitlist today</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;