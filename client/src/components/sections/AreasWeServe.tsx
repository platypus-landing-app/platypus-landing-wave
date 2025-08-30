import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/contexts/BookingContext";

const AreasWeServe = () => {
  const { openTrialBooking } = useBooking();
  const locations = [
    "Bandra",
    "Andheri",
    "Powai",
    "Worli",
    "Lower Parel",
    "Colaba",
    "Juhu",
    "Versova",
    "Malad",
    "Borivali",
    "Kandivali",
    "Santacruz",
    "Khar",
    "Byculla",
    "Dadar",
    "Matunga",
    "Kurla",
    "Chembur",
    "Ghatkopar",
    "Mulund",
    "Thane",
    "Navi Mumbai",
    "Vile Parle",
    "Goregaon",
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
    <section id="areas" className="relative py-24 bg-white overflow-hidden">
      {/* Background paw design - hidden on small screens */}
      <div
        className="hidden md:block absolute top-[-1rem] right-0 w-[200px] h-[240px] lg:top-[-2rem] lg:right-0 lg:w-[350px] lg:h-[400px] pointer-events-none"
        style={{
          backgroundImage: "url('/paw.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="font-funnel font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight capitalize mb-6">
            <span className="relative">
              Areas
              <span className="absolute bottom-[-10px] left-0 w-full max-w-[220px] h-0 border-b border-golden opacity-100"></span>
            </span>{" "}
            <span className="text-[#f97e57]">We Serve</span>
          </h2>

          {/* Paragraph and Button in flex container */}
          <div className="flex flex-col md:flex-row md:justify-between gap-6 ">
            <p className="font-funnel font-normal text-[18px] leading-[28px] text-black mt-4 max-w-4xl capitalize">
              Our pet walking service in Mumbai covers major localities across
              the city. Book trained dog walkers in Bandra, Andheri, Powai,
              Colaba, Juhu, Worli, Chembur, Malad and more updates and manage
              everything from one place.
            </p>

            <Button
              onClick={openTrialBooking}
              size="lg"
              className="bg-blue-500 hover:bg-blue-400 text-white px-10 py-4 text-lg font-medium hidden md:flex rounded hover:shadow-xl transition-all duration-300 hover:scale-105 items-center justify-center"
            >
              BOOK NOW
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {locations.map((location, index) => (
            <button
  key={index}
  className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 
             bg-[#B4B4B466] hover:bg-blue-50 rounded-sm text-gray-700 hover:text-blue-600 
             transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg 
             border border-gray-100 hover:scale-105"
  style={{ animationDelay: `${index * 0.05}s` }}
>
  <MapPin className="w-4 h-4 text-blue-600" />
  <span className="font-segoe text-[16px] leading-[24px] font-normal text-center">
    {location}
  </span>
</button>

          ))}
        </div>

        {/* Mobile Book Now Button */}
        <div className="mt-12 md:hidden text-center">
          <Button
            onClick={openTrialBooking}
            size="lg"
            className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-medium rounded shadow-lg hover:shadow-xl transition-all duration-300"
          >
            BOOK NOW
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AreasWeServe;
