import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import About from '@/components/sections/About';
import AreasWeServe from '@/components/sections/AreasWeServe';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/layout/Footer';
import HeroFeatures from '@/components/sections/HeroFeatures';

const Index = () => {
    // Structured data for the home page
    const websiteStructuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Platypus - India's #1 Certified Dog Walking Service in Mumbai",
        "description": "Professional dog walking service with certified Guardians, live GPS tracking, and safety protocols across Mumbai areas including Bandra, Andheri, Powai, and more.",
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
            "url": "https://theplatypus.in/hero Img.png"
        }
    };

    return (
        <>
            <Helmet>
                {/* Primary Meta Tags */}
                <title>Platypus - India's #1 Certified Dog Walking Service in Mumbai | Professional Pet Care</title>
                <meta name="title" content="Platypus - India's #1 Certified Dog Walking Service in Mumbai | Professional Pet Care" />
                <meta name="description" content="Book certified dog walkers in Mumbai with live GPS tracking. Professional pet walking service in Bandra, Andheri, Powai & more. Safe, reliable Guardians for your dog's daily walks. Book trial walk ₹199." />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://theplatypus.in/" />
                <meta property="og:title" content="Platypus - India's #1 Certified Dog Walking Service in Mumbai" />
                <meta property="og:description" content="Book certified dog walkers with live GPS tracking. Professional pet walking service across Mumbai. Safe, reliable Guardians for your dog's daily walks." />
                <meta property="og:image" content="https://theplatypus.in/og-image.jpg" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://theplatypus.in/" />
                <meta property="twitter:title" content="Platypus - India's #1 Certified Dog Walking Service in Mumbai" />
                <meta property="twitter:description" content="Book certified dog walkers with live GPS tracking. Professional pet walking service across Mumbai." />
                <meta property="twitter:image" content="https://theplatypus.in/twitter-image.jpg" />

                {/* Additional SEO Meta */}
                <link rel="canonical" href="https://theplatypus.in/" />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(websiteStructuredData)}
                </script>

                {/* Hreflang for regional targeting */}
                <link rel="alternate" hrefLang="en-in" href="https://theplatypus.in/" />
                <link rel="alternate" hrefLang="x-default" href="https://theplatypus.in/" />

                {/* Preload critical resources */}
                <link rel="preload" href="/hero Img.png" as="image" />
                <link rel="preload" href="/logo.png" as="image" />
            </Helmet>

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
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Index;