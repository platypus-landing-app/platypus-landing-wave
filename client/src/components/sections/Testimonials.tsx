'use client';

import { useState, useEffect, useRef, useCallback } from "react";
// useState used for Elfsight loader, useEffect for intersection observer + script loading
import { Star } from "lucide-react";
import ctaImage from "@/assets/3ind.png";
import { useBooking } from "@/contexts/BookingContext";
import ScrollReveal from "@/components/ui/ScrollReveal";

const QuoteIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className} aria-hidden="true">
    <path d="M21.66 13.41c-3.6 2.52-6.24 6.06-7.92 10.62-.36.96-.12 1.56.72 1.8.84.24 1.38-.12 1.62-1.08.96-3.96 2.82-7.08 5.58-9.36.48-.36.54-.84.18-1.44-.36-.54-.84-.66-1.38-.36-.24.12-.54.36-.8.48v.34zm14.4 0c-3.6 2.52-6.24 6.06-7.92 10.62-.36.96-.12 1.56.72 1.8.84.24 1.38-.12 1.62-1.08.96-3.96 2.82-7.08 5.58-9.36.48-.36.54-.84.18-1.44-.36-.54-.84-.66-1.38-.36-.24.12-.54.36-.8.48v.34z" />
  </svg>
);

const Testimonials = () => {
  const { openTrialBooking } = useBooking();
  const [isLoading, setIsLoading] = useState(true);
  const [loadElfsight, setLoadElfsight] = useState(false);
  const reviewsSectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Testimonials data
  const testimonials = [
    {
      name: "Sneha Pandey",
      location: "Pet Parent To Simba • Bandra West",
      image: "/testimonial1.jpg",
      quote:
        "I would definitely recommend Platypus. The Guardians provided by your team are well-trained, trustworthy & clearly care about the pet they walk.",
    },
    {
      name: "Tanusri Maitra",
      location: "Pet Parent To Prince",
      image: "/testimonial2.jpg",
      quote:
        "So far, I am very happy with the service. Regular, Punctual, Proper handling of the child, and the other best practices are picking up poop. I am so happy with the kind of walk my little one is getting",
    },
  ];

  // No carousel needed — show all testimonials directly

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && !loadElfsight) {
      setLoadElfsight(true);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    }
  }, [loadElfsight]);

  useEffect(() => {
    if (reviewsSectionRef.current) {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        rootMargin: '100px',
        threshold: 0.1,
      });
      observerRef.current.observe(reviewsSectionRef.current);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection]);

  useEffect(() => {
    if (!loadElfsight) return;
    const loadScript = () => {
      if (document.querySelector('script[src*="elfsightcdn.com"]')) {
        setIsLoading(false);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://elfsightcdn.com/platform.js';
      script.async = true;
      script.defer = true;
      script.onload = () => { setTimeout(() => { setIsLoading(false); }, 2000); };
      script.onerror = () => { setIsLoading(false); };
      document.body.appendChild(script);
    };
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadScript);
    } else {
      setTimeout(loadScript, 100);
    }
  }, [loadElfsight]);

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-white to-[#FFFCF0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <ScrollReveal variant="fadeUp">
          <div className="mb-16 text-left max-w-4xl">
            <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">trusted by pet parents</span>
            <h2 className="font-bold text-4xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-black capitalize mb-6">
              <span className="relative text-[#FF5B00]">
                Client
                <span className="absolute bottom-[-5px] left-0 w-full max-w-[120px] sm:max-w-[180px] md:max-w-[220px] h-0 border-b border-golden opacity-100"></span>
              </span>{" "}
              Testimonials
            </h2>
            <p className="font-normal text-sm sm:text-base leading-relaxed text-black capitalize mt-6">
              Loved by Dogs, Trusted by Pet Parents.
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials */}
        <div className="space-y-12 lg:space-y-16">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} variant={index % 2 === 0 ? 'fadeIn' : 'fadeUp'}>
              <div
                className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center`}
              >
                {/* Image */}
                <div className={`relative w-full h-[280px] sm:h-[320px] lg:h-[340px] rounded-2xl overflow-hidden shadow-brand-lg
                  ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}
                >
                  <picture>
                    <source
                      type="image/avif"
                      srcSet={`/optimized/${testimonial.image.replace(/\.(jpg|jpeg|png)$/i, '')}-small.avif 400w, /optimized/${testimonial.image.replace(/\.(jpg|jpeg|png)$/i, '')}-medium.avif 800w, /optimized/${testimonial.image.replace(/\.(jpg|jpeg|png)$/i, '')}.avif 960w`}
                      sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 960px"
                    />
                    <source
                      type="image/webp"
                      srcSet={`/optimized/${testimonial.image.replace(/\.(jpg|jpeg|png)$/i, '')}-small.webp 400w, /optimized/${testimonial.image.replace(/\.(jpg|jpeg|png)$/i, '')}-medium.webp 800w, /optimized/${testimonial.image.replace(/\.(jpg|jpeg|png)$/i, '')}.webp 960w`}
                      sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 960px"
                    />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </picture>

                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <div className="backdrop-blur-md bg-black/30 px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
                      <h3 className="font-bold text-lg sm:text-xl text-white capitalize">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 capitalize">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`relative z-10 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                  {/* Decorative quote mark */}
                  <QuoteIcon className="w-16 h-16 text-brand-blue/10 absolute -top-2 -left-2 lg:-left-6" />

                  {/* Star rating */}
                  <div className="flex gap-1 mb-4 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#FFE135] fill-[#FFE135]" />
                    ))}
                  </div>

                  <blockquote className="text-base sm:text-lg leading-relaxed sm:leading-[30px] text-gray-800 relative z-10">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Google Reviews Section */}
        <div ref={reviewsSectionRef} className="mt-20">
          <ScrollReveal variant="fadeUp">
            <div className="mb-12 text-left max-w-4xl">
              <h3 className="font-bold text-3xl sm:text-4xl leading-tight text-black capitalize mb-4">
                <span className="relative text-[#FF5B00]">
                  Google
                  <span className="absolute bottom-[-5px] left-0 w-full max-w-[100px] sm:max-w-[140px] h-0 border-b border-golden opacity-100"></span>
                </span>{" "}
                Reviews
              </h3>
              <p className="font-normal text-sm sm:text-base leading-relaxed text-black capitalize">
                See what our community is saying about us.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative min-h-[400px]">
            {loadElfsight && (
              <div style={{ contentVisibility: isLoading ? 'hidden' : 'auto', transition: 'opacity 0.3s ease-in-out', opacity: isLoading ? 0 : 1 }}>
                <div className="elfsight-app-cebab982-f1bd-4a47-a253-e6b2c69e7117" data-elfsight-app-lazy></div>
              </div>
            )}
            {isLoading && loadElfsight && (
              <div className="flex items-center justify-center py-16">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 border-4 border-[#247AFD] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600">Loading reviews...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="scaleUp">
          <div className="-translate-y-[90px]">
            <div className="text-center">
              <picture>
                <source type="image/avif" srcSet="/optimized/3ind-small.avif 400w, /optimized/3ind-medium.avif 800w, /optimized/3ind-large.avif 1200w, /optimized/3ind.avif 1280w" sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px" />
                <source type="image/webp" srcSet="/optimized/3ind-small.webp 400w, /optimized/3ind-medium.webp 800w, /optimized/3ind-large.webp 1200w, /optimized/3ind.webp 1280w" sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px" />
                <img src={ctaImage} alt="Dog walker with golden retriever" loading="lazy" decoding="async" className="mx-auto block w-full max-w-lg h-auto object-contain md:h-[400px] lg:h-[500px]" />
              </picture>
            </div>
          </div>
          <div className="bg-white rounded-3xl px-8 py-8 border border-gray-100 shadow-lg max-w-3xl mx-auto -mt-[200px] mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="mx-auto max-w-sm text-left">
                <h3 className="font-semibold text-[20px] leading-[28px] text-gray-900 mb-2">Ready To Book?</h3>
                <p className="text-[16px] leading-[24px] text-[#686868] mb-3">Available 7 days a week, 6 AM - 10 PM</p>
                <a href="tel:+918451880963" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                  <img src="/phone icon2.png" alt="Phone icon" loading="lazy" decoding="async" className="w-5 h-5" />
                  <span className="text-[16px] leading-[24px] text-[#686868]">Call us: +91 84518 80963</span>
                </a>
              </div>
              <div className="mx-auto max-w-sm text-left">
                <h3 className="font-semibold text-[20px] leading-[28px] text-gray-900 mb-2">Unlock Early Access</h3>
                <p className="text-[16px] leading-[24px] text-[#686868] mb-3">Get early access to the Platypus app</p>
                <button onClick={openTrialBooking} className="flex items-center space-x-2 text-[#247AFD] hover:text-[#1A5BC4] transition-all duration-300 hover:-translate-y-0.5 hover:drop-shadow-md">
                  <img src="/phone icon.png" loading="lazy" decoding="async" className="w-6 h-6" alt="Phone Icon" />
                  <span className="text-[16px] leading-[24px]">Join our community today</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;
