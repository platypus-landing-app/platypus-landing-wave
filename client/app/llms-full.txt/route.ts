import { getPublishedPosts } from '@/data/blog';
import { services } from '@/data/services';
import { locations } from '@/data/locations';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theplatypus.in';
  const posts = getPublishedPosts();
  const locationList = Object.values(locations);
  const serviceList = Object.values(services);

  const blogSection = posts
    .map(
      (post) =>
        `### ${post.title}\n- URL: ${siteUrl}/blog/${post.slug}\n- Date: ${post.date}\n- Category: ${post.category}\n- Summary: ${post.excerpt}`
    )
    .join('\n\n');

  const serviceSection = serviceList
    .map(
      (s) =>
        `### ${s.name}\n- URL: ${siteUrl}/services/${s.slug}\n- Status: ${s.status === 'active' ? 'Available' : 'Coming Soon'}\n- Description: ${s.description}${s.price ? `\n- Starting Price: ${s.price}` : ''}`
    )
    .join('\n\n');

  const locationSection = locationList
    .map(
      (l) =>
        `- [${l.name}](${siteUrl}/dog-walking/${l.slug}): ${l.displayName} — covering ${l.neighborhoods.join(', ')}. Landmarks: ${l.landmarks.join(', ')}.`
    )
    .join('\n');

  const content = `# Platypus

> Professional dog walking and pet care services in Mumbai, India.

Platypus is Mumbai's trusted pet care platform connecting pet parents with certified, trained dog walkers called "Guardians." Every walk includes live GPS tracking, real-time photo updates, and detailed walk reports. We serve ${locationList.length}+ areas across Mumbai.

## About

Platypus was founded in 2024 by Sagar Sutaria to solve the problem of busy pet parents in Mumbai who want the best care for their dogs. Our Guardians go through rigorous training and background verification. Key features include:

- **Live GPS Tracking**: Watch your dog's walk in real-time on a map.
- **Photo & Video Updates**: Receive pictures and videos during every walk.
- **Detailed Walk Reports**: Get a summary of distance, duration, poop/pee logs after each walk.
- **Certified Guardians**: All walkers are trained, verified, and insured.
- **Flexible Scheduling**: Morning and evening walk slots, 7 days a week.
- **Trial Walk at ₹199**: Every new customer can start with an affordable trial walk.

## Services

${serviceSection}

## Pricing (Dog Walking)

| Plan | Price | Details |
|------|-------|---------|
| Trial Walk | ₹199 | Single walk with a certified Guardian |
| Experience Pack | ₹399 | 2 walks to experience the service |
| Monthly Once Daily | ₹4,680 | 30 days, one walk per day |
| Monthly Twice Daily | ₹7,800 | 30 days, two walks per day |

## Service Areas

We operate across ${locationList.length} neighborhoods in Mumbai, Thane, and Navi Mumbai:

${locationSection}

Each area has a dedicated page with local FAQ and reviews: ${siteUrl}/dog-walking/[area-slug]

## Frequently Asked Questions

Q: How much does dog walking cost in Mumbai with Platypus?
A: Trial walk is ₹199, experience pack (2 walks) is ₹399, monthly once-daily plan is ₹4,680, and monthly twice-daily plan is ₹7,800. All plans include GPS tracking, certified Guardians, and daily walk reports.

Q: What areas in Mumbai does Platypus serve?
A: We serve ${locationList.length}+ areas including ${locationList.map((l) => l.name).join(', ')}.

Q: Are Platypus dog walkers certified?
A: Yes, all Guardians undergo rigorous training covering canine behavior, safety protocols, first aid, and GPS tracking systems. They are background-verified and insured.

Q: Does Platypus provide live GPS tracking during dog walks?
A: Yes, every walk includes live GPS tracking so pet parents can monitor their dog's location, route, and activity in real-time. Photo updates and detailed walk reports are sent after every walk.

Q: How do I book a dog walking service with Platypus?
A: Book through our website at ${siteUrl}, via WhatsApp at +91 84518 80963, or call us directly. We recommend starting with the ₹199 trial walk.

Q: What safety measures does Platypus follow during walks?
A: All Guardians follow strict protocols: secure leashing, pre-walk health checks, emergency procedures for strays/heatstroke, vaccination verification, and real-time GPS tracking. Guardians carry sanitization kits and are trained in pet first aid.

Q: Can I become a dog walker with Platypus?
A: Yes! We're hiring Guardians across Mumbai. Earn ₹15,000–30,000/month with flexible hours, free training, and insurance. Apply at ${siteUrl}/join.

Q: Is Platypus only for dog walking?
A: Dog walking is our core service. Grooming, training, and pet sitting are coming soon. Sign up for notifications on each service page.

## Blog

Expert articles on dog care, pet health, walking tips, and local guides.

${blogSection}

## Join Our Team

We're hiring dog walkers, groomers, and trainers across Mumbai.
- URL: ${siteUrl}/join
- Roles: Dog Walker (Guardian), Dog Groomer, Dog Trainer, Pet Sitter
- Compensation: ₹15,000–30,000/month (part-time, flexible hours)
- Requirements: Love for animals, reliable, good communication skills
- Benefits: Free training, flexible hours, insurance coverage, growth opportunities

## Contact

- Website: ${siteUrl}
- Email: info@theplatypus.in
- WhatsApp: +91 84518 80963
- Location: Mumbai, Maharashtra, India
- Founded: 2024 by Sagar Sutaria

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
