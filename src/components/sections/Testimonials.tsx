import { useState, useEffect } from "react";
import { Phone, Smartphone } from "lucide-react";
import ctaImage from "@/assets/3ind.png";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Testimonials data
  const testimonials = [
    {
      name: "Sneha Pandey",
      location: "Pet Parent To Simba • Bandra West",
      image: "/testimonial1.jpg",
      quote:
        "Nullam Eleifend Lectus A Tortor Interdum, Non Sodales Ante Vehicula. Proin Consequat, At Commodo. Donec Eros Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus. Sed Vel Scelerisque Quam, Id Fringilla Ante. Vivamus Sagittis Velit Quis Dictum Ultrices. Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue.",
    },
    {
      name: "Raj Patel",
      location: "Pet Parent To Bruno • Andheri East",
      image: "/testimonial2.jpg",
      quote:
        "Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue. Donec Eros Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus. Sed Vel Scelerisque Quam, Id Fringilla Ante. Vivamus Sagittis Velit Quis Dictum Ultrices. Nullam Eleifend Lectus A Tortor Interdum, Non Sodales Ante Vehicula. Proin Consequat, At Commodo.",
    },
  ];

  // Group testimonials into chunks of 2
  const groupedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    groupedTestimonials.push(testimonials.slice(i, i + 2));
  }

  // Auto-slide every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % groupedTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [groupedTestimonials.length]);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-left max-w-4xl">
          <h2 className="font-[Funnel_Sans] font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-black capitalize mb-6">
            <span className="relative text-[#f97e57]">
              Client
              <span className="absolute bottom-[-5px] left-0 w-full max-w-[120px] sm:max-w-[180px] md:max-w-[220px] h-0 border-b border-golden opacity-100"></span>
            </span>{" "}
            Testimonials
          </h2>
          <p className="font-[Funnel_Sans] font-normal text-sm sm:text-base leading-relaxed text-black capitalize mt-6">
            Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue. Donec Eros
            Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus.
          </p>
        </div>

        {/* Testimonials - Two per slide */}
        <div className="relative">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {groupedTestimonials.map((group, groupIndex) => (
              <div key={groupIndex} className="w-full flex-shrink-0 space-y-16">
                {group.map((testimonial, index) => (
                  <div
                    key={index}
                    className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                  >
                    {/* Image */}
                    <div
                      className={`relative rounded overflow-hidden shadow-xl w-full lg:w-full lg:h-[300px] ${
                        index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <img
  src={testimonial.image}
  alt={testimonial.name}
  className="w-full h-[250px] sm:h-[280px] md:h-[300px] lg:h-[300px] object-cover"
/>


                      {/* Overlay */}
                      <div className="absolute bottom-0 left-0 right-0">
                        {/* Blur grey part for text - Mobile responsive */}
                        <div className="backdrop-blur-md bg-gray-500/40 px-2 sm:px-4 py-1.5 sm:py-3 flex flex-col sm:flex-row items-center justify-center space-y-0.5 sm:space-y-0 sm:space-x-3">
                          <h3 className="font-[Funnel_Sans] font-bold text-[16px] sm:text-[20px] lg:text-[22px] leading-[20px] sm:leading-[28px] lg:leading-[32px] text-white capitalize text-center">
                            {testimonial.name}
                          </h3>
                          <p className="font-[Funnel_Sans] font-normal text-[11px] sm:text-[13px] lg:text-[14px] leading-[14px] sm:leading-[16px] lg:leading-[18px] text-white/90 capitalize text-center">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content with Background Logo */}
                    <div
                      className={`space-y-6 ${
                        index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                      } relative z-10`}
                    >
                      {/* Background Logos positioned at content start */}
                      <div className="absolute top-0 left-[-20px] pointer-events-none z-0 opacity-30">
                        <img
                          src="/testimonial bg.png"
                          alt="background logo"
                          className="w-[120px]"
                        />
                      </div>
                      <div className="absolute bottom-0 right-0 pointer-events-none z-0">
                        <img
                          src="/testimonial bg.png"
                          alt="background logo secondary"
                          className="w-[80px] opacity-5 rotate-180"
                        />
                      </div>

                      <blockquote className="font-[Funnel_Sans] font-normal text-[18px] leading-[39.83px] text-black capitalize relative z-10">
                        {testimonial.quote}
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.length > 2 &&
            groupedTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-[#8993A4] scale-125"
                    : "bg-[#A3A3A361] hover:bg-[#8993A4]/60"
                }`}
                aria-label={`Go to testimonials page ${index + 1}`}
              />
            ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Image */}
        <div className="-translate-y-[90px]"> 
        <div className="text-center">
          <img
            src={ctaImage}
            alt="Dog walker with golden retriever"
            className="mx-auto block w-full max-w-lg h-auto object-contain md:h-[400px] lg:h-[500px]"
          />
        </div>
        </div>
       {/* Inner White Box */}
<div className="bg-white rounded-3xl px-8 py-6 border-b border-[#397CEF] shadow-[0_15px_30px_-10px_rgba(57,124,239,0.3)] max-w-3xl mx-auto -mt-[200px] mb-4">

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Ready to Book */}
    <div className="mx-auto max-w-sm text-left">
      <h3 className="font-[Funnel_Sans] font-semibold text-[20px] leading-[28px] text-gray-900 mb-2">
        Ready to Book?
      </h3>
      <p className="text-[16px] leading-[24px] text-[#686868] mb-3">
        Available 7 days a week, 8 AM - 8 PM
      </p>
      <a
        href="tel:+918451880963"
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
      >
        <img src="/phone icon2.png" className="w-5 h-5 text-blue-600" />
        <span className="font-['Segoe_UI_Symbol'] text-[16px] leading-[24px] text-[#686868]">
          Call us: +91 84518 80963
        </span>
      </a>
    </div>

    {/* Get App Early Access */}
    <div className="mx-auto max-w-sm text-left">
      <h3 className="font-[Funnel_Sans] font-semibold text-[20px] leading-[28px] text-gray-900 mb-2">
        Get App Early Access
      </h3>
      <p className="font-['Segoe_UI_Symbol'] text-[16px] leading-[24px] text-[#686868] mb-3">
        Be first to download in August 2025
      </p>
      <button
        onClick={() => handleScrollTo("#testimonials")}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
      >
        <img src="/phone icon.png" className="w-6 h-6 text-blue-600" />
        <span className="font-['Segoe_UI_Symbol'] text-[16px] leading-[24px] text-[#686868]">
          Join our community today
        </span>
      </button>
    </div>
  </div>
</div>

      </div>
    </section>
  );
};

export default Testimonials;
