import { getPublishedPosts } from '@/data/blog';
import { services } from '@/data/services';
import { locations } from '@/data/locations';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theplatypus.in';
  const locationList = Object.values(locations);

  const content = `# Platypus

> Professional dog walking and pet care services in Mumbai, India.

Platypus is Mumbai's trusted pet care platform connecting pet parents with certified, trained dog walkers called "Guardians." Every walk includes live GPS tracking, real-time photo updates, and detailed walk reports. We serve ${locationList.length}+ areas across Mumbai.

## Services

- [Dog Walking](${siteUrl}/services/dog-walking): Professional daily dog walking with GPS tracking and live updates. Trial walk ₹199, monthly plans from ₹4,680.
- [Dog Grooming](${siteUrl}/services/dog-grooming): Professional grooming services (coming soon).
- [Dog Training](${siteUrl}/services/dog-training): Certified dog training programs (coming soon).
- [Pet Sitting](${siteUrl}/services/pet-sitting): In-home pet sitting and boarding (coming soon).

## Key Pages

- [Homepage](${siteUrl}): Book a trial walk, see how it works, and explore areas we serve.
- [All Services](${siteUrl}/services): Overview of all pet care services.
- [Blog](${siteUrl}/blog): Expert tips on dog care, pet health, and walking guides.
- [Join Our Team](${siteUrl}/join): Apply to become a Platypus Guardian (dog walker, groomer, or trainer).

## Service Areas

We operate across ${locationList.length}+ neighborhoods in Mumbai including ${locationList.slice(0, 12).map((l) => l.name).join(', ')}, and more.

## Frequently Asked Questions

Q: How much does dog walking cost in Mumbai with Platypus?
A: Trial walk is ₹199, experience pack (2 walks) is ₹399, monthly once-daily plan is ₹4,680, and monthly twice-daily plan is ₹7,800. All plans include GPS tracking and certified Guardians.

Q: What areas in Mumbai does Platypus serve?
A: We serve ${locationList.length}+ areas including ${locationList.map((l) => l.name).join(', ')}.

Q: Are Platypus dog walkers certified?
A: Yes, all Guardians undergo rigorous training covering canine behavior, safety protocols, first aid, and GPS tracking systems. They are background-verified and insured.

Q: Does Platypus provide live GPS tracking during dog walks?
A: Yes, every walk includes live GPS tracking so you can monitor your dog's location, route, and activity in real-time. You also receive photo updates and a detailed walk report.

Q: How do I book a dog walking service with Platypus?
A: You can book through our website at ${siteUrl}, via WhatsApp at +91 84518 80963, or call us. We recommend starting with the ₹199 trial walk.

Q: Is Platypus only for dog walking?
A: Dog walking is our core service today. We are expanding into dog grooming, dog training, and pet sitting — all coming soon.

## Contact

- Website: ${siteUrl}
- Email: info@theplatypus.in
- WhatsApp: +91 84518 80963
- Location: Mumbai, Maharashtra, India
- Founded: 2024 by Sagar Sutaria

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
