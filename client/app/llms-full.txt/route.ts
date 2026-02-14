import { getPublishedPosts } from '@/data/blog';
import { services } from '@/data/services';
import { locations } from '@/data/locations';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theplatypus.in';
  const posts = getPublishedPosts();
  const locationNames = locations.map((l) => l.name);

  const blogSection = posts
    .map(
      (post) =>
        `### ${post.title}\n- URL: ${siteUrl}/blog/${post.slug}\n- Date: ${post.date}\n- Category: ${post.category}\n- Summary: ${post.excerpt}`
    )
    .join('\n\n');

  const serviceSection = services
    .map(
      (s) =>
        `### ${s.name}\n- URL: ${siteUrl}/services/${s.slug}\n- Status: ${s.status === 'active' ? 'Available' : 'Coming Soon'}\n- Description: ${s.description}${s.price ? `\n- Starting Price: ${s.price}` : ''}`
    )
    .join('\n\n');

  const content = `# Platypus

> Professional dog walking and pet care services in Mumbai, India.

Platypus is Mumbai's trusted pet care platform connecting pet parents with certified, trained dog walkers called "Guardians." Every walk includes live GPS tracking, real-time photo updates, and detailed walk reports. We serve 21+ areas across Mumbai.

## About

Platypus was founded to solve the problem of busy pet parents in Mumbai who want the best care for their dogs. Our Guardians go through rigorous training and background verification. Key features include:

- **Live GPS Tracking**: Watch your dog's walk in real-time on a map.
- **Photo & Video Updates**: Receive pictures and videos during every walk.
- **Detailed Walk Reports**: Get a summary of distance, duration, poop/pee logs after each walk.
- **Certified Guardians**: All walkers are trained, verified, and insured.
- **Flexible Scheduling**: Morning and evening walk slots, 7 days a week.
- **Free Trial Walk**: Every new customer gets a complimentary first walk.

## Services

${serviceSection}

## Service Areas

We operate across ${locationNames.length} neighborhoods in Mumbai:
${locationNames.map((name) => `- ${name}`).join('\n')}

Each area has a dedicated page with local information: ${siteUrl}/dog-walking/[area-slug]

## Blog

Expert articles on dog care, pet health, walking tips, and local guides.

${blogSection}

## Join Our Team

We're hiring dog walkers, groomers, and trainers across Mumbai.
- URL: ${siteUrl}/join
- Roles: Dog Walker, Dog Groomer, Dog Trainer
- Compensation: Rs 15,000 - 30,000/month (part-time flexible)
- Requirements: Love for animals, reliable, good communication skills
- Benefits: Training provided, flexible hours, insurance coverage, growth opportunities

## Contact

- Website: ${siteUrl}
- Email: info@theplatypus.in
- Phone: +91 93213 53530
- Location: Mumbai, Maharashtra 400050, India

## Technical

- [Sitemap](${siteUrl}/sitemap.xml)
- [RSS Feed](${siteUrl}/feed.xml)
- [LLMs.txt (summary)](${siteUrl}/llms.txt)
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
