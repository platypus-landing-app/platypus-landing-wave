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
        url: "https://theplatypus.in/hero-image.png",
        width: 1200,
        height: 630,
        alt: "Professional Dog Walking Service in Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@platypus_bth",
    creator: "@platypus_bth",
    title: "Professional Dog Walking Service in Mumbai | Platypus",
    description: "Professional dog walking in Mumbai with certified Guardians. Live GPS tracking, safety protocols.",
    images: ["https://theplatypus.in/hero-image.png"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={funnelSans.variable}>
      <head>

        {/* Performance: Preload critical LCP image */}
        <link rel="preload" href="/optimized/hero-image.avif" as="image" type="image/avif" />
        <link rel="preload" href="/optimized/hero-image.webp" as="image" type="image/webp" />

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
                    page_title: 'Platypus - Dog Walking Service Mumbai',
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
                script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDPagXMYjDaZHTwwph1RAx485E8GEq8RO8&libraries=places&region=IN&loading=async';
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
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
