import type { Metadata } from 'next';
import Script from 'next/script';
import PetfedLanding from '@/components/petfed/PetfedLanding';

export const metadata: Metadata = {
  title: 'Platypus at PetFed Mumbai 2026 | Book a Buddy for Your Pup',
  description:
    'Platypus is at PetFed Mumbai 2026! Book a Buddy to watch your dog while you enjoy the event (₹399/30min), or grab our Welcome Pack — 5 walks at ₹499.',
  keywords: [
    'PetFed Mumbai 2026',
    'dog buddy service',
    'pet festival Mumbai',
    'Platypus dog walking',
    'NESCO pet event',
    'PetFed buddy booking',
  ],
  alternates: {
    canonical: 'https://theplatypus.in/petfed',
  },
  openGraph: {
    title: 'Platypus × PetFed Mumbai 2026',
    description: 'Book a Buddy for your pup at PetFed. ₹399 for 30 min of care.',
    url: 'https://theplatypus.in/petfed',
    images: [{ url: 'https://theplatypus.in/og-image.png', width: 1200, height: 630 }],
  },
};

export default function PetfedPage() {
  const eventData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'PetFed Mumbai 2026',
    description: 'India\'s biggest pet festival. Platypus offers Buddy Service (₹399/30min) and Welcome Pack (5 walks at ₹499).',
    startDate: '2026-03-21T11:00:00+05:30',
    endDate: '2026-03-22T21:00:00+05:30',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: 'NESCO Exhibition Centre',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hall 3, NESCO Exhibition Centre, Goregaon East',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        postalCode: '400063',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 19.150269,
        longitude: 72.8530249,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'PetFed India',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Buddy Service',
        price: '399',
        priceCurrency: 'INR',
        description: 'A Platypus Guardian watches your dog for 30 minutes while you enjoy PetFed.',
      },
      {
        '@type': 'Offer',
        name: 'Welcome Pack — 5 Walks',
        price: '499',
        priceCurrency: 'INR',
        description: '5 dog walks at ₹499. Use anytime, no expiry.',
      },
    ],
  };

  return (
    <>
      <Script
        id="petfed-event-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventData) }}
      />
      <PetfedLanding />
    </>
  );
}
