import { getPublishedPosts } from '@/data/blog';
import { services } from '@/data/services';
import { locations } from '@/data/locations';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theplatypus.in';

  const content = `# Platypus

> Professional dog walking and pet care services in Mumbai, India.

Platypus is Mumbai's trusted pet care platform connecting pet parents with certified, trained dog walkers called "Guardians." Every walk includes live GPS tracking, real-time photo updates, and detailed walk reports. We serve 21+ areas across Mumbai.

## Services

- [Dog Walking](${siteUrl}/services/dog-walking): Professional daily dog walking with GPS tracking and live updates. Starting at Rs 399/walk.
- [Dog Grooming](${siteUrl}/services/dog-grooming): Professional grooming services (coming soon).
- [Dog Training](${siteUrl}/services/dog-training): Certified dog training programs (coming soon).
- [Pet Sitting](${siteUrl}/services/pet-sitting): In-home pet sitting and boarding (coming soon).

## Key Pages

- [Homepage](${siteUrl}): Book a free trial walk, see how it works, and explore areas we serve.
- [All Services](${siteUrl}/services): Overview of all pet care services.
- [Blog](${siteUrl}/blog): Expert tips on dog care, pet health, and walking guides.
- [Join Our Team](${siteUrl}/join): Apply to become a Platypus Guardian (dog walker, groomer, or trainer).

## Service Areas

We operate across 21+ neighborhoods in Mumbai including Bandra, Andheri, Powai, Worli, Juhu, Thane, Lower Parel, Colaba, Versova, Malad, Borivali, Kandivali, Santacruz, Khar, Dadar, and more.

## Contact

- Website: ${siteUrl}
- Email: info@theplatypus.in
- Phone: +91 93213 53530
- Location: Mumbai, Maharashtra, India

## Optional

- [Sitemap](${siteUrl}/sitemap.xml)
- [RSS Feed](${siteUrl}/feed.xml)
- [Full LLMs file](${siteUrl}/llms-full.txt)
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
