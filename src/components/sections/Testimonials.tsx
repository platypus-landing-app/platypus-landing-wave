import { useState, useEffect } from "react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
// import testimonial4 from "@/assets/testimonial-4.jpg";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Pet Parent To Simba • Bandra West",
      image: testimonial1,
      quote:
        "Nullam Eleifend Lectus A Tortor Interdum, Non Sodales Ante Vehicula. Proin Consequat, At Commodo. Donec Eros Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus. Sed Vel Scelerisque Quam, Id Fringilla Ante. Vivamus Sagittis Velit Quis Dictum Ultrices. Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue."
    },
    {
      name: "Raj Patel",
      location: "Pet Parent To Bruno • Andheri East",
      image: testimonial2,
      quote:
        "Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue. Donec Eros Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus. Sed Vel Scelerisque Quam, Id Fringilla Ante. Vivamus Sagittis Velit Quis Dictum Ultrices. Nullam Eleifend Lectus A Tortor Interdum, Non Sodales Ante Vehicula. Proin Consequat, At Commodo."
    },
    {
      name: "Anita Singh",
      location: "Pet Parent To Max • Powai",
      image: testimonial3,
      quote:
        "Donec Eros Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus. Sed Vel Scelerisque Quam, Id Fringilla Ante. Vivamus Sagittis Velit Quis Dictum Ultrices. Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue. Nullam Eleifend Lectus A Tortor Interdum, Non Sodales Ante Vehicula."
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
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-left max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-orange-500">Client</span> Testimonials
          </h2>
          <p className="text-lg text-gray-700">
            Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue. Donec Eros Massa,
            Gravida Ac Lectus Et, Pharetra Interdum Lectus.
          </p>
        </div>

        {/* Current Slide with Two Testimonials */}
        <div className="space-y-16 transition-all duration-700">
          {groupedTestimonials[currentSlide].map((testimonial, index) => (
            <div
              key={index}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-cols-2" : ""
              }`}
            >
              {/* Image - Left for first testimonial, Right for second */}
              <div className={`relative rounded-3xl overflow-hidden shadow-xl aspect-[4/5] ${
                index % 2 === 1 ? "lg:order-2" : "lg:order-1"
              }`}>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
                {/* Overlay with name and location */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Content - Right for first testimonial, Left for second */}
              <div className={`space-y-6 text-left ${
                index % 2 === 1 ? "lg:order-1" : "lg:order-2"
              }`}>
                <blockquote className="text-lg text-gray-700 leading-relaxed">
                  {testimonial.quote}
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {groupedTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
