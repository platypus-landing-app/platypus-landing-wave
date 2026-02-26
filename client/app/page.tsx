import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import HeroFeatures from '@/components/sections/HeroFeatures';
import Script from 'next/script';

// Lazy load below-fold components to reduce initial JS bundle
const Features = dynamic(() => import('@/components/sections/Features'), {
  loading: () => <div className="min-h-[400px]" />,
});
const About = dynamic(() => import('@/components/sections/About'), {
  loading: () => <div className="min-h-[400px]" />,
});
const AreasWeServe = dynamic(() => import('@/components/sections/AreasWeServe'), {
  loading: () => <div className="min-h-[300px]" />,
});
const Process = dynamic(() => import('@/components/sections/Process'), {
  loading: () => <div className="min-h-[400px]" />,
});
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <div className="min-h-[400px]" />,
});
const OurServices = dynamic(() => import('@/components/sections/OurServices'), {
  loading: () => <div className="min-h-[300px]" />,
});
const StatsCounters = dynamic(() => import('@/components/sections/StatsCounters'), {
  loading: () => <div className="min-h-[200px]" />,
});
const JoinTeamCTA = dynamic(() => import('@/components/sections/JoinTeamCTA'), {
  loading: () => <div className="min-h-[200px]" />,
});
const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <div className="min-h-[300px]" />,
});
const Footer = dynamic(() => import('@/components/layout/Footer'), {
  loading: () => <div className="min-h-[200px]" />,
});

export const metadata: Metadata = {
  title: "Professional Dog Walking Service in Mumbai | Platypus Certified Guardians",
  description: "Professional dog walking in Mumbai with certified Guardians. Live GPS tracking, safety protocols across Bandra, Andheri, Juhu & more areas.",
};

export default function Home() {
  // Structured data for the home page
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Professional Dog Walking Service in Mumbai | Platypus Certified Guardians",
    "description": "Professional dog walking in Mumbai with certified Guardians. Live GPS tracking, safety protocols. Book trial walk ₹199. Serving Bandra, Andheri, Juhu & more.",
    "url": "https://theplatypus.in",
    "inLanguage": "en-IN",
    "isPartOf": { "@id": "https://theplatypus.in/#website" },
    "about": { "@id": "https://theplatypus.in/#organization" },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://theplatypus.in/og-image.png"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://theplatypus.in" }
      ]
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#main-content h1", "#main-content .hero-description"]
    }
  };

  // LocalBusiness with Reviews and AggregateRating
  const localBusinessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://theplatypus.in/#localbusiness",
    "name": "Platypus Dog Walking Service",
    "image": "https://theplatypus.in/hero-image.png",
    "description": "Professional dog walking service in Mumbai with certified Guardians, live GPS tracking, and comprehensive safety protocols.",
    "url": "https://theplatypus.in",
    "telephone": "+918451880963",
    "email": "info@theplatypus.in",
    "parentOrganization": { "@id": "https://theplatypus.in/#organization" },
    "sameAs": [
      "https://www.instagram.com/platypus.pet",
      "https://twitter.com/platypus_bth"
    ],
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
    "areaServed": [
      { "@type": "City", "name": "Mumbai" }
    ],
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

  // FAQ structured data (JSON-LD, server-rendered for Google)
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What areas in Mumbai do you serve for dog walking services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide professional dog walking services across major Mumbai areas including Mira Road, Borivali, Kandivali, Malad, Goregaon, Andheri, Juhu, Bandra, Khar, Dadar, Wadala, Prabhadevi, Lower Parel, Grant Road, Kurla, and Chembur. Our certified Guardians are strategically located to serve these areas with consistent, reliable service."
        }
      },
      {
        "@type": "Question",
        "name": "How much does professional dog walking cost in Mumbai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our dog walking services are affordably priced: Trial walk at ₹199, Experience walks (2 walks) for ₹399, Monthly once-a-day plan at ₹4,680, Monthly twice-a-day plan at ₹7,800, and discounted 3-month plans starting at ₹21,600 for twice-daily service. All packages include live GPS tracking, certified Guardian service, and safety protocols."
        }
      },
      {
        "@type": "Question",
        "name": "Are your dog walkers certified and professionally trained?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our Guardians undergo rigorous certification and training programs. They receive professional uniforms, hygiene kits, safety training, and follow strict protocols. We maintain backup walker availability to ensure your dog's walk is never cancelled. Our training covers pet behavior, safety procedures, emergency protocols, and customer service standards."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide live GPS tracking during dog walks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Every dog walk includes live GPS tracking so you can monitor your pet's location, route, and activity in real-time through our app. You'll receive SOS alerts, digital updates about your dog's behavior, bathroom breaks, and overall walk experience. This transparency gives pet parents complete peace of mind."
        }
      },
      {
        "@type": "Question",
        "name": "What safety measures do you follow during dog walks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Safety is our top priority. Our certified Guardians follow strict hygiene protocols, carry sanitization kits, use secure leashing techniques, and are trained in pet first aid. We conduct health checks before each walk, maintain vaccination verification, and have emergency contact protocols. All Guardians are background-verified and insured."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book a dog walking service with Platypus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Booking is simple! You can book through our website, WhatsApp (+91 84518 80963), or our upcoming mobile app. We recommend starting with our ₹199 trial walk to experience our service quality. Our team will match you with a local certified Guardian based on your area, preferred timing, and your dog's specific needs."
        }
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
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
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
          <OurServices />
          <About />
          <StatsCounters />
          <AreasWeServe />
          <Process />
          <Testimonials />
          <JoinTeamCTA />
          <FAQ />
        </main>

        <Footer />
      </div>
    </>
  );
}
