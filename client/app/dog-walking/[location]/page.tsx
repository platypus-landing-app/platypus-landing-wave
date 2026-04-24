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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theplatypus.in';

  return {
    title: `Professional Dog Walking Service in ${locationInfo.name} | Platypus Certified Guardians`,
    description: `${locationInfo.description.charAt(0).toUpperCase()}${locationInfo.description.slice(1)}. Live GPS tracking, safety protocols. Book trial walk ₹199 in ${locationInfo.displayName}.`,
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.theplatypus.in';

  // LocalBusiness with location-specific reviews and neighborhood areaServed
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/dog-walking/${location}#business`,
    name: `Platypus Dog Walking Service in ${locationInfo.name}`,
    description: `${locationInfo.description.charAt(0).toUpperCase()}${locationInfo.description.slice(1)}. Live GPS tracking, safety protocols, certified Guardians.`,
    url: `${siteUrl}/dog-walking/${location}`,
    telephone: '+918451880963',
    email: 'support@theplatypus.in',
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

          {/* Standard Sections */}
          <HeroFeatures />
          <Process />
          <Features />

          {/* Location FAQ — visible to both crawlers AND readers.
              We intentionally do NOT render the generic home FAQ on location
              pages; local questions are more useful for parents researching
              their neighbourhood. */}
          {locationInfo.faq.length > 0 ? (
            <section
              id="faq"
              className="py-16 lg:py-24 bg-white"
              aria-label={`Frequently asked questions about dog walking in ${locationInfo.name}`}
            >
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">
                    local questions
                  </span>
                  <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
                    Dog walking in <span className="text-brand-blue">{locationInfo.name}</span>
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    The specifics of walking your dog in {locationInfo.displayName}.
                  </p>
                </div>
                <div className="space-y-4">
                  {locationInfo.faq.map((f, i) => (
                    <details
                      key={i}
                      className="group bg-[#FFFCF0] rounded-lg border border-brand-blue/10 px-6 py-4 open:border-brand-blue/30 open:border-l-4 open:border-l-brand-blue transition-colors"
                    >
                      <summary className="cursor-pointer text-left font-semibold text-gray-900 list-none flex justify-between items-center">
                        {f.question}
                        <span className="ml-4 text-brand-blue transition-transform group-open:rotate-180">▾</span>
                      </summary>
                      <p className="mt-3 text-gray-600 leading-relaxed">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <FAQ />
          )}

          <AreasWeServe />
          <Testimonials />

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
