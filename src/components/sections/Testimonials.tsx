import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Pet Parent To Simba • Bandra West",
      image: "https://images.unsplash.com/photo-1494790108755-2616c829e8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      quote: "Nullam Eleifend Lectus A Tortor Interdum, Non Sodales Ante Vehicula. Proin Consequat, At Commodo. Donec Eros Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus. Sed Vel Scelerisque Quam, Id Fringilla Ante. Vivamus Sagittis Velit Quis Dictum Ultrices. Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue."
    },
    {
      name: "Raj Patel",
      location: "Pet Parent To Bruno • Andheri East",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      quote: "Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue. Donec Eros Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus. Sed Vel Scelerisque Quam, Id Fringilla Ante. Vivamus Sagittis Velit Quis Dictum Ultrices. Nullam Eleifend Lectus A Tortor Interdum, Non Sodales Ante Vehicula. Proin Consequat, At Commodo."
    },
    {
      name: "Anita Singh",
      location: "Pet Parent To Max • Powai",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      quote: "Donec Eros Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus. Sed Vel Scelerisque Quam, Id Fringilla Ante. Vivamus Sagittis Velit Quis Dictum Ultrices. Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue. Nullam Eleifend Lectus A Tortor Interdum, Non Sodales Ante Vehicula."
    },
    {
      name: "Arjun Mehta",
      location: "Pet Parent To Luna • Juhu",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      quote: "Vivamus Sagittis Velit Quis Dictum Ultrices. Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue. Nullam Eleifend Lectus A Tortor Interdum, Non Sodales Ante Vehicula. Proin Consequat, At Commodo. Donec Eros Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus."
    }
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-orange-500">Client</span> Testimonials
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue. Donec Eros Massa,
            Gravida Ac Lectus Et, Pharetra Interdum Lectus.
          </p>
        </div>

        {/* Testimonials - Two per slide with alternating layout */}
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
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center`}
                  >
                    {/* Image - Left for first testimonial (index 0), Right for second (index 1) */}
                    <div className={`relative rounded-2xl overflow-hidden shadow-xl aspect-[3/2] max-w-sm ${
                      index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                    }`}>
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay with name and location */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {testimonial.name}
                        </h3>
                        <p className="text-white/90 text-sm font-medium">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>

                    {/* Content - Right for first testimonial, Left for second */}
                    <div className={`space-y-6 ${
                      index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                    }`}>
                      <blockquote className="text-lg text-black font-medium leading-relaxed">
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
                  ? "bg-orange-500 scale-125" 
                  : "bg-gray-300 hover:bg-gray-400"
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