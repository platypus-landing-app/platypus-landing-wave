import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import FeaturedBlogPost from '@/components/blog/FeaturedBlogPost';
import BlogGrid from '@/components/blog/BlogGrid';
import { getPublishedPosts, getAllCategories } from '@/data/blog';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const dynamic = 'force-dynamic';

const POSTS_PER_PAGE = 9;

export const metadata: Metadata = {
  title: 'Dog Care & Pet Health Blog | Platypus Expert Tips',
  description:
    'Expert dog care tips, pet health advice, and dog walking insights from Platypus certified Guardians. Learn how to keep your dog happy, healthy, and active.',
  keywords:
    'dog care tips, pet health blog, dog walking advice, dog behavior, pet wellness, Mumbai dog care',
  openGraph: {
    type: 'website',
    url: 'https://www.theplatypus.in/blog',
    title: 'Dog Care & Pet Health Blog | Platypus Expert Tips',
    description: 'Expert dog care tips and pet health advice from Platypus certified Guardians.',
    images: [
      {
        url: 'https://www.theplatypus.in/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Platypus Dog Care Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dog Care & Pet Health Blog | Platypus',
    description: 'Expert dog care tips from Platypus certified Guardians.',
    images: ['https://www.theplatypus.in/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.theplatypus.in/blog',
  },
};

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageStr, category } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? '1', 10) || 1);

  const allPosts = getPublishedPosts();
  const categories = getAllCategories();

  // Category filter
  const filteredPosts = category
    ? allPosts.filter((p) => p.category === category)
    : allPosts;

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = filteredPosts.slice(pageStart, pageStart + POSTS_PER_PAGE);

  const siteUrl = 'https://www.theplatypus.in';
  const blogPosts = allPosts;
  const [featuredPost] = blogPosts;
  // On page 1 with no filter, the featured post is already rendered
  // separately, so remove it from the paginated grid to avoid duplication.
  const showFeaturedStandalone =
    currentPage === 1 && !category && filteredPosts.length > 0;
  const remainingPosts = showFeaturedStandalone
    ? filteredPosts.slice(1, 1 + POSTS_PER_PAGE)
    : pagePosts;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Platypus Blog - Dog Care Tips & Pet Health',
    description:
      'Expert advice on dog walking, pet health, and dog care from Platypus certified Guardians. Learn how to keep your pup happy and healthy.',
    url: `${siteUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Platypus',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    blogPost: blogPosts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${siteUrl}/blog/${p.slug}`,
      datePublished: p.date,
      image: `${siteUrl}${p.image}`,
      author: {
        '@type': 'Person',
        name: 'Sagar Sutaria',
      },
    })),
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
    ],
  };

  return (
    <>
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="blog-breadcrumb-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <div className="min-h-screen bg-white">
        <Navigation />

        <Breadcrumb items={[{ label: 'Blog' }]} />

        <main className="pt-[70px] md:pt-[80px]">
          {/* Hero Section */}
          <section className="relative bg-[#FFFBF0] py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,225,53,0.10)_0%,_transparent_60%)]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl">
                <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">expert insights</span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight font-domine text-gray-900">
                  Platypus Blog
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                  Expert tips on dog care, health, and happiness from our certified Guardians
                </p>
              </div>
            </div>
          </section>

          {/* Category tabs */}
          {categories.length > 0 && (
            <section className="bg-white border-b border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  <Link
                    href="/blog"
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      !category
                        ? 'bg-brand-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/blog?category=${encodeURIComponent(cat)}`}
                      className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        category === cat
                          ? 'bg-brand-blue text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Featured Post — only on page 1, no filter */}
          {showFeaturedStandalone && featuredPost && (
            <section className="py-12 md:py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FeaturedBlogPost post={featuredPost} />
              </div>
            </section>
          )}

          {/* All Posts Grid */}
          {remainingPosts.length > 0 ? (
            <section className="py-12 md:py-20 bg-gradient-to-b from-white via-[#FFFCF0] to-white relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                  <span className="font-guttery text-brand-blue text-lg sm:text-xl mb-2 block">
                    {category ? 'in this category' : 'keep reading'}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {category ? category : 'More Articles'}
                  </h2>
                </div>
                <BlogGrid posts={remainingPosts} />

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="mt-16 flex items-center justify-center gap-2" aria-label="Pagination">
                    {currentPage > 1 && (
                      <Link
                        href={`/blog?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${currentPage - 1}`}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        ← Previous
                      </Link>
                    )}
                    <span className="px-4 py-2 text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    {currentPage < totalPages && (
                      <Link
                        href={`/blog?${category ? `category=${encodeURIComponent(category)}&` : ''}page=${currentPage + 1}`}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-brand-blue text-white hover:bg-brand-blue-dark"
                      >
                        Next →
                      </Link>
                    )}
                  </nav>
                )}
              </div>
            </section>
          ) : (
            <section className="py-24 bg-white text-center">
              <p className="text-gray-600">No posts found in this category yet.</p>
              <Link
                href="/blog"
                className="inline-block mt-4 text-brand-blue hover:text-brand-blue-dark underline"
              >
                See all posts
              </Link>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
