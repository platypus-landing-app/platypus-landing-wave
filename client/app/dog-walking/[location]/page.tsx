import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import AreasWeServe from '@/components/sections/AreasWeServe';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/layout/Footer';
import FAQ from '@/components/sections/FAQ';
import HeroFeatures from '@/components/sections/HeroFeatures';
import { locations, type LocationData } from '@/data/locations';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { NearbyAreas } from '@/components/sections/NearbyAreas';
import LocationHero from './LocationHero';

interface LocationPageProps {
  params: Promise<{ location: string }>;
}

// Use dynamic rendering for location pages
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Generate static params for all locations
export async function generateStaticParams() {
  return Object.keys(locations).map((location) => ({
    location,
  }));
}

// Generate metadata for each location
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { location } = await params;
  const locationInfo = locations[location];

  if (!locationInfo) {
    return {
      title: 'Location Not Found | Platypus',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theplatypus.in';

  return {
    title: `Professional Dog Walking Service in ${locationInfo.name} | Platypus Certified Guardians`,
    description: `Professional ${locationInfo.description}. Live GPS tracking, safety protocols. Book trial walk ₹199 in ${locationInfo.displayName}.`,
    keywords: `dog walking ${location}, dog walker ${locationInfo.name}, pet care ${locationInfo.name}, certified dog walkers ${location}, professional dog walking ${locationInfo.name}, dog walker near me ${locationInfo.name}`,
    openGraph: {
      title: `Professional Dog Walking Service in ${locationInfo.name} | Platypus`,
      description: `Certified dog walking service in ${locationInfo.displayName} with live GPS tracking and trained Guardians.`,
      url: `${siteUrl}/dog-walking/${location}`,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `Platypus Dog Walking in ${locationInfo.name}`,
        },
      ],
    },
    alternates: {
      canonical: `${siteUrl}/dog-walking/${location}`,
    },
    other: {
      'geo.region': 'IN-MH',
      'geo.placename': `${locationInfo.name}, Mumbai`,
      'geo.position': `${locationInfo.coordinates.lat};${locationInfo.coordinates.lng}`,
      ICBM: `${locationInfo.coordinates.lat}, ${locationInfo.coordinates.lng}`,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { location } = await params;
  const locationInfo = locations[location];

  if (!locationInfo) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theplatypus.in';

  // LocalBusiness with location-specific reviews and neighborhood areaServed
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/dog-walking/${location}#business`,
    name: `Platypus Dog Walking Service - ${locationInfo.name}`,
    description: `Professional ${locationInfo.description}. Live GPS tracking, safety protocols, certified Guardians.`,
    url: `${siteUrl}/dog-walking/${location}`,
    telephone: '+918451880963',
    email: 'info@theplatypus.in',
    image: `${siteUrl}/hero-image.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: locationInfo.name,
      addressRegion: 'Mumbai, Maharashtra',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: locationInfo.coordinates.lat,
      longitude: locationInfo.coordinates.lng,
    },
    areaServed: locationInfo.neighborhoods.map((n) => ({
      '@type': 'Neighborhood',
      name: n,
      containedInPlace: {
        '@type': 'City',
        name: 'Mumbai',
      },
    })),
    priceRange: '₹199 - ₹7800',
    openingHours: 'Mo-Su 06:00-22:00',
    parentOrganization: { '@id': 'https://theplatypus.in/#organization' },
    sameAs: [
      'https://www.instagram.com/platypus.pet',
      'https://twitter.com/platypus_bth',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '127',
    },
    review: locationInfo.reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.rating),
        bestRating: '5',
      },
      reviewBody: r.text,
      datePublished: r.date,
    })),
  };

  // BreadcrumbList JSON-LD
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Dog Walking Services',
        item: `${siteUrl}/services/dog-walking`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${locationInfo.name} Dog Walking`,
        item: `${siteUrl}/dog-walking/${location}`,
      },
    ],
  };

  // FAQPage JSON-LD from location-specific FAQ data
  const faqData = locationInfo.faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: locationInfo.faq.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <Script
        id="location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="location-breadcrumb-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      {faqData && (
        <Script
          id="location-faq-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
      )}

      <div className="min-h-screen">
        <Navigation />

        <Breadcrumb
          items={[
            { label: 'Dog Walking Services', href: '/services/dog-walking' },
            { label: `${locationInfo.name} Dog Walking` },
          ]}
        />

        <main id="main-content">
          {/* Location-Specific Hero Section */}
          <LocationHero locationInfo={locationInfo} location={location} />

          {/* Location FAQ - visible in DOM for crawlers */}
          {locationInfo.faq.length > 0 && (
            <section className="sr-only" aria-label={`Frequently asked questions about dog walking in ${locationInfo.name}`}>
              <h2>Dog Walking FAQ - {locationInfo.name}</h2>
              {locationInfo.faq.map((f, i) => (
                <div key={i}>
                  <h3>{f.question}</h3>
                  <p>{f.answer}</p>
                </div>
              ))}
            </section>
          )}

          {/* Standard Sections */}
          <HeroFeatures />
          <Features />
          <AreasWeServe />
          <Process />
          <Testimonials />
          <FAQ />

          {/* Nearby Areas Section - Internal Linking for SEO */}
          {locationInfo.nearbyAreas && locationInfo.nearbyAreas.length > 0 && (
            <NearbyAreas
              currentLocation={location}
              nearbyLocations={locationInfo.nearbyAreas}
            />
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
