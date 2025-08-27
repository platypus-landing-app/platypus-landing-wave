import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      name: "Priya Sharma",
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
          <h2 className="font-[Funnel_Sans] font-bold text-[60px] leading-[19.91px] text-black capitalize mb-6">
            <span className="relative text-[#f97e57]">
              Client
              <span className="absolute bottom-[-10px] left-0 w-[220px] h-0 border-b border-golden opacity-100"></span>
            </span>{" "}
            Testimonials
          </h2>
          <p className="font-[Funnel_Sans] font-normal text-[16.59px] leading-[18.81px] text-black capitalize mt-9">
            Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue. Donec Eros
            Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus.
          </p>
        </div>

        {/* Testimonials - Two per slide */}
        <div className="relative overflow-hidden">
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
                      className={`relative rounded overflow-hidden shadow-xl aspect-[3/2] w-[500px] h-[300px] ${
                        index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay */}
                      <div className="absolute bottom-0 left-0 right-0">
                        {/* Blur grey part for text */}
                        <div className="backdrop-blur-md bg-gray-500/40 px-4 py-3 flex flex-row items-center justify-center space-x-3">
                          <h3 className="font-[Montserrat] font-bold text-[22px] leading-[32px] text-white capitalize text-center">
                            {testimonial.name}
                          </h3>
                          <p className="font-[Rubik] font-normal text-[14px] leading-[18px] text-white/90 capitalize text-center">
                            {testimonial.location}
                          </p>
                        </div>

                        {/* Smaller blending black shade - no gap */}
                        <div className="h-2 bg-gradient-to-b from-black/20 to-black/80 -mt-1"></div>
                      </div>
                    </div>

                    {/* Content with Background Logo */}
                    <div
                      className={`space-y-6 ${
                        index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                      } relative z-10`}
                    >
                      {/* Background Logo positioned at content start */}
                      <div className="absolute top-0 left-0 pointer-events-none z-0">
                        <img
                          src="/testimonial bg.png"
                          alt="background logo"
                          className="w-[120px] opacity-10"
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
  {groupedTestimonials.map((_, index) => (
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
    </section>
  );
};

export default Testimonials;