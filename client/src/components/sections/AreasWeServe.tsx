import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";

const AreasWeServe = () => {
  const { openTrialBooking } = useBooking();

  // Enhanced location data with SEO-friendly structure
  const locations = [
    "Bandra", "Andheri", "Powai", "Worli", "Lower Parel", "Colaba",
    "Juhu", "Versova", "Malad", "Borivali", "Kandivali", "Santacruz",
    "Khar", "Byculla", "Dadar", "Matunga", "Kurla", "Chembur",
    "Ghatkopar", "Mulund", "Thane", "Navi Mumbai", "Vile Parle", "Goregaon"
  ];

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
      <section
          id="areas"
          className="relative py-24 bg-white overflow-hidden"
          itemScope
          itemType="https://schema.org/ServiceArea"
      >
        {/* Hidden structured data for SEO */}
        <div style={{ display: 'none' }}>
          <span itemProp="name">Mumbai Dog Walking Service Areas</span>
          <span itemProp="description">Professional certified dog walking services across major Mumbai areas</span>
          <div itemProp="areaServed" itemScope itemType="https://schema.org/City">
            <span itemProp="name">Mumbai</span>
            <div itemProp="containedInPlace" itemScope itemType="https://schema.org/State">
              <span itemProp="name">Maharashtra</span>
            </div>
          </div>
        </div>

        {/* Background paw design - hidden on small screens */}
        <div
            className="hidden md:block absolute top-[-1rem] right-0 w-[200px] h-[240px] lg:top-[-2rem] lg:right-0 lg:w-[350px] lg:h-[400px] pointer-events-none"
            style={{
              backgroundImage: "url('/paw.png')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
            aria-hidden="true"
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <header>
              <h2 className="font-funnel font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight capitalize mb-6">
              <span className="relative">
                Areas
                <span className="absolute bottom-[-10px] left-0 w-full max-w-[220px] h-0 border-b border-golden opacity-100"></span>
              </span>{" "}
                <span className="text-[#f97e57]">We Serve</span>
              </h2>
            </header>

            {/* Enhanced description with local SEO keywords */}
            <div className="flex flex-col md:flex-row md:justify-between gap-6">
              <div className="max-w-4xl">
                <p className="font-funnel font-normal text-[18px] leading-[28px] text-black mt-4 capitalize mb-4">
                  Our <strong>professional dog walking service in Mumbai</strong> covers major localities across the city.
                  Book <strong>trained and certified dog walkers in Bandra, Andheri, Powai, Colaba, Juhu, Worli, Chembur, Malad</strong> and more areas.
                  Get real-time updates and manage everything from one place with our <strong>verified Guardian network</strong>.
                </p>

                {/* Additional SEO-rich content */}
                <p className="font-rubik text-[16px] leading-[24px] text-gray-600">
                  <strong>Professional pet walking services</strong> available across <strong>Western Suburbs, South Mumbai, Central Mumbai</strong> and extended areas.
                  Our <strong>certified dog walking Guardians</strong> provide reliable, safe, and joyful walks with <strong>live GPS tracking</strong>.
                </p>
              </div>

              <Button
                  onClick={openTrialBooking}
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-4 text-lg font-medium hidden md:flex rounded hover:shadow-xl transition-all duration-300 hover:scale-105 items-center justify-center"
                  aria-label="Book professional dog walking service now"
              >
                BOOK NOW
              </Button>
            </div>
          </div>

          {/* Service Areas Grid with enhanced SEO */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {locations.map((location, index) => (
                <div
                    key={index}
                    className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3
                         bg-[#B4B4B466] hover:bg-blue-50 rounded-sm text-gray-700 hover:text-blue-600
                         transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg
                         border border-gray-100 hover:scale-105 group cursor-pointer"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    itemScope
                    itemType="https://schema.org/Place"
                    title={`Professional dog walking service in ${location}, Mumbai`}
                >
                  <MapPin className="w-4 h-4 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  <span
                      className="font-segoe text-[16px] leading-[24px] font-normal text-center"
                      itemProp="name"
                  >
                {location}
              </span>

                  {/* Hidden structured data */}
                  <div style={{ display: 'none' }}>
                <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="addressLocality">{location}</span>
                  <span itemProp="addressRegion">Mumbai, Maharashtra</span>
                  <span itemProp="addressCountry">India</span>
                </span>
                    <span itemProp="description">Professional dog walking service available in {location}, Mumbai</span>
                  </div>
                </div>
            ))}
          </div>

          {/* Service Coverage Information */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="font-funnel font-bold text-xl text-gray-900 mb-4">
              Complete Mumbai Coverage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Western Suburbs</h4>
                <p className="text-gray-600">
                  <strong>Professional dog walkers</strong> in Bandra, Andheri, Juhu, Versova, Malad, Borivali, Kandivali, Santacruz, Khar, Vile Parle, Goregaon
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">South & Central Mumbai</h4>
                <p className="text-gray-600">
                  <strong>Certified pet care</strong> in Worli, Lower Parel, Colaba, Byculla, Dadar, Matunga, Powai, Kurla, Chembur
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Extended Areas</h4>
                <p className="text-gray-600">
                  <strong>Expanding service</strong> to Ghatkopar, Mulund, Thane, Navi Mumbai with certified Guardians
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Book Now Button */}
          <div className="mt-12 md:hidden text-center">
            <Button
                onClick={openTrialBooking}
                size="lg"
                className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium rounded shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Book professional dog walking service in Mumbai"
            >
              BOOK NOW
            </Button>
          </div>

          {/* Local SEO Enhancement */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 text-sm leading-relaxed max-w-4xl mx-auto">
              <strong>Professional dog walking services</strong> across Mumbai with <strong>certified Guardians</strong>,
              <strong>live GPS tracking</strong>, and <strong>comprehensive safety protocols</strong>.
              Available 7 days a week, 6 AM - 10 PM in all major Mumbai localities. Book your <strong>trial walk for ₹199</strong> today!
            </p>
          </div>
        </div>
      </section>
  );
};

export default AreasWeServe;