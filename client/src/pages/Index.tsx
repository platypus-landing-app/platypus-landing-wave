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
import FAQ from '@/components/sections/FAQ';


const Index = () => {
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

    return (
        <>
            <Helmet>
                {/* Primary Meta Tags - FIXED LENGTH */}
                <title>Professional Dog Walking Service in Mumbai | Platypus Certified Guardians</title>
                <meta name="title" content="Professional Dog Walking Service in Mumbai | Platypus Certified Guardians" />
                <meta name="description" content="Professional dog walking in Mumbai with certified Guardians. Live GPS tracking, safety protocols. Book trial walk ₹199. Serving Bandra, Andheri, Powai & more." />

                {/* Enhanced SEO Meta Tags */}
                <meta name="keywords" content="dog walking Mumbai, certified dog walkers, professional pet care Mumbai, dog walking service Bandra, pet walking Andheri, GPS tracking dog walk, trusted dog walkers Mumbai" />
                <meta name="geo.region" content="IN-MH" />
                <meta name="geo.placename" content="Mumbai" />
                <meta name="geo.position" content="19.0760;72.8777" />
                <meta name="ICBM" content="19.0760, 72.8777" />
                <meta name="author" content="Platypus - Third Planet Solutions Private Limited" />
                <meta name="publisher" content="Platypus" />
                <meta name="language" content="en-IN" />

                {/* Open Graph / Facebook - FIXED IMAGE REFERENCES */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://theplatypus.in/" />
                <meta property="og:title" content="Professional Dog Walking Service in Mumbai | Platypus Certified Guardians" />
                <meta property="og:description" content="Professional dog walking in Mumbai with certified Guardians. Live GPS tracking, safety protocols across Bandra, Andheri, Powai & more areas." />
                <meta property="og:image" content="https://theplatypus.in/hero-image.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter - FIXED IMAGE REFERENCES */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://theplatypus.in/" />
                <meta property="twitter:title" content="Professional Dog Walking Service in Mumbai | Platypus Certified Guardians" />
                <meta property="twitter:description" content="Professional dog walking in Mumbai with certified Guardians. Live GPS tracking, safety protocols across Mumbai." />
                <meta property="twitter:image" content="https://theplatypus.in/hero-image.png" />

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
                    <FAQ />
                </main>

                <Footer />
            </div>
        </>
    );
};

export default Index;