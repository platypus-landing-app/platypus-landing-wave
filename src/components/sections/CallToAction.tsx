import { Phone, Smartphone } from "lucide-react";

const CallToAction = () => {
  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Image */}
        <div className="text-center mb-6">
          <img
            src={"/3ind.png"}
            alt="Dog walker with golden retriever"
            className="mx-auto h-80 w-auto object-contain"
          />
        </div>

        {/* Single White Box */}
        <div className="bg-white rounded-3xl p-10 border-b-4 border-blue-600 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Ready to Book */}
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Ready to Book?
              </h3>
              <p className="text-lg text-gray-600 mb-4 font-medium">
                Available 7 days a week, 8 AM - 8 PM
              </p>
              <a
                href="tel:+918451880963"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Phone className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-medium">Call us: +91 84518 80963</span>
              </a>
            </div>

            {/* Get App Early Access */}
            <div className="text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Get App Early Access
              </h3>
              <p className="text-lg text-gray-600 mb-4 font-medium">
                Be first to download in August 2025
              </p>
              <button
                onClick={() => handleScrollTo("#testimonials")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Smartphone className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-medium">Join our community today</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
