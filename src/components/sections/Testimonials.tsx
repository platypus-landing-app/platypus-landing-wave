import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import testimonial1 from '@/assets/testimonial-1.jpg';
import testimonial2 from '@/assets/testimonial-2.jpg';
import testimonial3 from '@/assets/testimonial-3.jpg';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Pet Parent To Simba • Bandra West",
      image: testimonial1,
      quote: "Nullam Eleifend Lectus A Tortor Interdum, Non Sodales Ante Vehicula. Proin Consequat, At Commodo. Donec Eros Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus. Sed Vel Scelerisque Quam, Id Fringilla Ante. Vivamus Sagittis Velit Quis Dictum Ultricies. Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue."
    },
    {
      name: "Raj Patel",
      location: "Pet Parent To Bruno • Andheri East",
      image: testimonial2,
      quote: "Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue. Donec Eros Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus. Sed Vel Scelerisque Quam, Id Fringilla Ante. Vivamus Sagittis Velit Quis Dictum Ultricies. Nullam Eleifend Lectus A Tortor Interdum, Non Sodales Ante Vehicula. Proin Consequat, At Commodo."
    },
    {
      name: "Anita Singh",
      location: "Pet Parent To Max • Powai",
      image: testimonial3,
      quote: "Donec Eros Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus. Sed Vel Scelerisque Quam, Id Fringilla Ante. Vivamus Sagittis Velit Quis Dictum Ultricies. Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue. Nullam Eleifend Lectus A Tortor Interdum, Non Sodales Ante Vehicula."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-orange-500">Client</span> Testimonials
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Quisque Posuere Rhoncus Erat, Sit Amet Aliquet Augue. Donec Eros Massa, Gravida Ac Lectus Et, Pharetra Interdum Lectus.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={testimonials[currentSlide].image} 
                  alt={testimonials[currentSlide].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {testimonials[currentSlide].name}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {testimonials[currentSlide].location}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Quote */}
            <div className="space-y-6">
              <div className="text-6xl text-gray-200 font-serif leading-none">"</div>
              <blockquote className="text-lg text-gray-700 leading-relaxed">
                {testimonials[currentSlide].quote}
              </blockquote>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;