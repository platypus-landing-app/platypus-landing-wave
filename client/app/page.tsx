import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import About from '@/components/sections/About';
import AreasWeServe from '@/components/sections/AreasWeServe';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/layout/Footer';
import HeroFeatures from '@/components/sections/HeroFeatures';
import FAQ from '@/components/sections/FAQ';
import Script from 'next/script';

export default function Home() {
  // Structured data for the home page
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Professional Dog Walking Service in Mumbai | Platypus Certified Guardians",
    "description": "Professional dog walking in Mumbai with certified Guardians. Live GPS tracking, safety protocols. Book trial walk ₹199. Serving Bandra, Andheri, Powai & more.",
    "url": "https://theplatypus.in",
    "inLanguage": "en-IN",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Platypus",
      "url": "https://theplatypus.in"
    },
    "about": {
      "@type": "LocalBusiness",
      "name": "Platypus"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://theplatypus.in/hero-image.png"
    }
  };

  // LocalBusiness with Reviews and AggregateRating
  const localBusinessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Platypus Dog Walking Service",
    "image": "https://theplatypus.in/hero-image.png",
    "description": "Professional dog walking service in Mumbai with certified Guardians, live GPS tracking, and comprehensive safety protocols.",
    "url": "https://theplatypus.in",
    "telephone": "+918451880963",
    "email": "info@theplatypus.in",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    "priceRange": "₹199 - ₹7800",
    "openingHours": "Mo-Su 06:00-22:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "127"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sneha Pandey"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "I would definitely recommend Platypus. The Guardians provided by your team are well-trained, trustworthy & clearly care about the pet they walk.",
        "datePublished": "2024-12-15"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Tanusri Maitra"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "So far, I am very happy with the service. Regular, Punctual, Proper handling of the child, and the other best practices are picking up poop. I am so happy with the kind of walk my little one is getting",
        "datePublished": "2025-01-10"
      }
    ]
  };

  return (
    <>
      {/* Structured Data */}
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <Script
        id="local-business-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessStructuredData) }}
      />

      <div className="min-h-screen">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-4 z-50"
        >
          Skip to main content
        </a>

        <Navigation />

        <main id="main-content">
          <Hero />
          <HeroFeatures />
          <Features />
          <About />
          <AreasWeServe />
          <Process />
          <Testimonials />
          <FAQ />
        </main>

        <Footer />
      </div>
    </>
  );
}
