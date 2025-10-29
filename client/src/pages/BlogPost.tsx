// src/pages/BlogPost.tsx

import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { getBlogPostBySlug, getRelatedPosts } from '@/data/blogPosts';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBooking } from '@/contexts/BookingContext';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const { openTrialBooking } = useBooking();

    if (!slug) {
        return <Navigate to="/blog" replace />;
    }

    const post = getBlogPostBySlug(slug);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    const relatedPosts = getRelatedPosts(slug, 2);

    const formattedDate = new Date(post.date).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    // Parse content into proper sections
    const contentSections = post.content
        .trim()
        .split('\n\n')
        .filter(section => section.trim() !== '');

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": `https://theplatypus.in${post.image}`,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
            "@type": "Organization",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Platypus",
            "logo": {
                "@type": "ImageObject",
                "url": "https://theplatypus.in/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://theplatypus.in/blog/${post.slug}`
        }
    };

    return (
        <>
            <Helmet>
                <title>{post.title} | Platypus Blog</title>
                <meta name="description" content={post.metaDescription} />
                <meta name="keywords" content={post.keywords.join(', ')} />
                <meta name="author" content={post.author} />

                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://theplatypus.in/blog/${post.slug}`} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.metaDescription} />
                <meta property="og:image" content={`https://theplatypus.in${post.image}`} />
                <meta property="article:published_time" content={post.date} />
                <meta property="article:author" content={post.author} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://theplatypus.in/blog/${post.slug}`} />
                <meta property="twitter:title" content={post.title} />
                <meta property="twitter:description" content={post.metaDescription} />
                <meta property="twitter:image" content={`https://theplatypus.in${post.image}`} />

                <link rel="canonical" href={`https://theplatypus.in/blog/${post.slug}`} />

                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            <div className="min-h-screen bg-white">
                <Navigation />

                <main className="pt-[70px] md:pt-[80px]">
                    {/* Breadcrumbs */}
                    <div className="bg-gray-50 border-b border-gray-200">
                        <div className="max-w-5xl mx-auto">
                            <Breadcrumb
                                items={[
                                    { label: "Blog", href: "/blog" },
                                    { label: post.title },
                                ]}
                            />
                        </div>
                    </div>

                    {/* Article Header */}
                    <article className="py-12 md:py-16">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            {/* Category Badge */}
                            <div className="mb-6">
                                <Badge className="bg-[#FFD700] hover:bg-[#FFC700] text-gray-900 font-semibold px-4 py-1.5 text-sm">
                                    {post.category}
                                </Badge>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                                {post.title}
                            </h1>

                            {/* Meta Info & Share */}
                            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-10 pb-8 border-b border-gray-200">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-[#0088FF]" />
                                    <span className="font-medium">{formattedDate}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-[#0088FF]" />
                                    <span className="font-medium">{post.readTime}</span>
                                </div>
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 ml-auto hover:text-[#0088FF] transition-colors font-medium"
                                >
                                    <Share2 className="w-5 h-5" />
                                    <span>Share</span>
                                </button>
                            </div>

                            {/* Featured Image */}
                            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-auto"
                                />
                            </div>

                            {/* Article Content */}
                            <div className="prose prose-lg max-w-none">
                                {contentSections.map((section, index) => {
                                    const trimmedSection = section.trim();

                                    // Handle H2 headings
                                    if (trimmedSection.startsWith('## ')) {
                                        return (
                                            <h2 key={index} className="text-3xl md:text-4xl font-bold text-gray-900 mt-16 mb-6 leading-tight">
                                                {trimmedSection.substring(3)}
                                            </h2>
                                        );
                                    }

                                    // Handle paragraphs with bold text
                                    const processedText = trimmedSection.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>');

                                    return (
                                        <p
                                            key={index}
                                            className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6"
                                            dangerouslySetInnerHTML={{ __html: processedText }}
                                        />
                                    );
                                })}
                            </div>

                            {/* CTA Section */}
                            <div className="mt-20 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0088FF] via-[#0077EE] to-[#0066DD] p-10 md:p-14 text-center shadow-2xl">
                                <div className="absolute inset-0 opacity-20">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl"></div>
                                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                                        Ready to Give Your Dog the Best Care?
                                    </h3>
                                    <p className="text-lg md:text-xl mb-8 text-white/95 max-w-2xl mx-auto">
                                        Book a trial walk with our certified Guardians today
                                    </p>
                                    <Button
                                        onClick={openTrialBooking}
                                        size="lg"
                                        className="bg-[#FFD700] text-gray-900 hover:bg-[#FFC700] font-bold px-10 py-6 text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                                    >
                                        BOOK TRIAL NOW - ₹199
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section className="py-16 md:py-20 bg-gray-50">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                                    Related Articles
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                                    {relatedPosts.map((relatedPost) => (
                                        <BlogCard key={relatedPost.slug} post={relatedPost} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </main>

                <Footer />
            </div>
        </>
    );
};

export default BlogPost;