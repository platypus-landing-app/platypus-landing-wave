import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

// Self-hosted Funnel Sans - exact same font, zero render-blocking
const funnelSans = Funnel_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-funnel',
});

export const metadata: Metadata = {
  title: "Professional Dog Walking Service in Mumbai | Platypus Certified Guardians",
  description: "Professional dog walking in Mumbai with certified Guardians. Live GPS tracking, safety protocols across Bandra, Andheri, Powai & more areas.",
  keywords: [
    "dog walking Mumbai",
    "professional dog walker",
    "certified dog guardian",
    "pet care Mumbai",
    "dog walking service Bandra",
    "dog walking service Andheri",
    "GPS tracked dog walking",
    "Mumbai pet services"
  ],
  authors: [{ name: "Platypus Team" }],
  creator: "Platypus",
  publisher: "Platypus",
  metadataBase: new URL("https://theplatypus.in"),
  alternates: {
    canonical: "https://theplatypus.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://theplatypus.in/",
    siteName: "Platypus",
    title: "Professional Dog Walking Service in Mumbai | Platypus Certified Guardians",
    description: "Professional dog walking in Mumbai with certified Guardians. Live GPS tracking, safety protocols across Bandra, Andheri, Powai & more areas.",
    images: [
      {
        url: "https://theplatypus.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Platypus - India's Dog Walking Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@platypus_bth",
    creator: "@platypus_bth",
    title: "Professional Dog Walking Service in Mumbai | Platypus",
    description: "Professional dog walking in Mumbai with certified Guardians. Live GPS tracking, safety protocols.",
    images: ["https://theplatypus.in/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: { google: "ADD_YOUR_GSC_CODE_HERE" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={funnelSans.variable}>
      <head>
        {/* Critical CSS - Inline to prevent render blocking */}
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --background: 210 20% 98%;
            --foreground: 215 25% 15%;
            --primary: 200 85% 45%;
            --primary-foreground: 210 40% 98%;
            --muted: 195 100% 95%;
            --muted-foreground: 215 16% 47%;
            --border: 200 50% 90%;
            --ring: 200 85% 45%;
            --radius: 1rem;
          }
          * {
            border-color: hsl(var(--border));
          }
          body {
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
            font-family: var(--font-funnel), system-ui, -apple-system, sans-serif;
          }
        `}} />

        {/* Performance: Preload critical LCP image */}
        <link rel="preload" href="/optimized/hero-image.avif" as="image" type="image/avif" fetchPriority="high" />
        <link rel="preload" href="/optimized/hero-image.webp" as="image" type="image/webp" fetchPriority="high" />

        {/* Google Analytics - Deferred loading */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                setTimeout(function() {
                  var script = document.createElement('script');
                  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-E00405X4KK';
                  script.async = true;
                  document.head.appendChild(script);

                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-E00405X4KK', {
                    send_page_view: true
                  });
                }, 2000);
              });
            `,
          }}
        />

        {/* Google Maps - Idle loading */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function loadGoogleMaps() {
                if (window.googleMapsLoaded) return;
                window.googleMapsLoaded = true;

                const script = document.createElement('script');
                script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDPagXMYjDaZHTwwph1RAx485E8GEq8RO8' + '&libraries=places' + '&region=IN' + '&loading=async';
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);
              }

              if ('requestIdleCallback' in window) {
                requestIdleCallback(loadGoogleMaps, { timeout: 3000 });
              } else {
                setTimeout(loadGoogleMaps, 3000);
              }

              ['click', 'touchstart', 'scroll'].forEach(function(event) {
                document.addEventListener(event, loadGoogleMaps, { once: true, passive: true });
              });
            `,
          }}
        />
        {/* Organization + WebSite structured data — site-wide */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://theplatypus.in/#organization",
                  "name": "Platypus",
                  "url": "https://theplatypus.in",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://theplatypus.in/logo.png"
                  },
                  "image": "https://theplatypus.in/og-image.png",
                  "description": "Professional pet care platform in India. Certified Guardians, GPS-tracked dog walking, grooming, training, and pet sitting services across Mumbai.",
                  "email": "info@theplatypus.in",
                  "telephone": "+918451880963",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Mumbai",
                    "addressRegion": "Maharashtra",
                    "addressCountry": "IN"
                  },
                  "sameAs": [
                    "https://www.instagram.com/platypus.pet",
                    "https://twitter.com/platypus_bth"
                  ],
                  "foundingDate": "2024",
                  "founder": {
                    "@type": "Person",
                    "name": "Sagar Sutaria",
                    "jobTitle": "Founder",
                    "sameAs": "https://www.linkedin.com/in/sagarsutaria/"
                  },
                  "numberOfEmployees": {
                    "@type": "QuantitativeValue",
                    "minValue": 10,
                    "maxValue": 50
                  },
                  "areaServed": [
                    { "@type": "City", "name": "Mumbai", "containedInPlace": { "@type": "State", "name": "Maharashtra" } },
                    { "@type": "City", "name": "Thane", "containedInPlace": { "@type": "State", "name": "Maharashtra" } },
                    { "@type": "City", "name": "Navi Mumbai", "containedInPlace": { "@type": "State", "name": "Maharashtra" } }
                  ],
                  "knowsAbout": ["Dog Walking", "Pet Care", "Dog Grooming", "Dog Training", "Pet Sitting"],
                  "hasCredential": [
                    {
                      "@type": "EducationalOccupationalCredential",
                      "name": "Platypus Guardian Certification Program",
                      "description": "In-house training and certification for professional dog walkers covering safety protocols, pet behavior, first aid, and GPS tracking systems."
                    }
                  ],
                  "slogan": "India's Dog Walking Expert"
                },
                {
                  "@type": "WebSite",
                  "@id": "https://theplatypus.in/#website",
                  "url": "https://theplatypus.in",
                  "name": "Platypus",
                  "publisher": { "@id": "https://theplatypus.in/#organization" },
                  "inLanguage": "en-IN",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://theplatypus.in/blog?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
