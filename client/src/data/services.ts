export type ServiceStatus = 'active' | 'coming-soon';

export interface ServiceData {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  icon: string; // lucide icon name
  status: ServiceStatus;
  features: string[];
  price?: string;
  image: string;
}

export const services: Record<string, ServiceData> = {
  'dog-walking': {
    slug: 'dog-walking',
    name: 'Dog Walking',
    shortName: 'Walking',
    tagline: 'Safe, structured walks by certified Guardians',
    description:
      'Professional dog walking service in Mumbai with certified Guardians, live GPS tracking, real-time updates, and strict safety protocols. Every walk is tailored to your dog\'s breed, age, and energy level.',
    metaDescription:
      'Professional dog walking service in Mumbai with certified Guardians, live GPS tracking, and safety protocols. Book a trial walk for ₹199.',
    keywords: [
      'dog walking Mumbai',
      'professional dog walker',
      'dog walking service',
      'pet walker Mumbai',
      'certified dog walkers',
      'GPS tracked dog walks',
    ],
    icon: 'Footprints',
    status: 'active',
    features: [
      'Certified & background-verified Guardians',
      'Live GPS tracking on every walk',
      'Real-time photo & video updates',
      'Breed-appropriate walk plans',
      'Strict safety protocols & leash handling',
      'Flexible scheduling (morning & evening slots)',
      'Post-walk report cards',
      'Dedicated Guardian assignment',
    ],
    price: '₹199 trial walk',
    image: '/hero-image.png',
  },
  'dog-grooming': {
    slug: 'dog-grooming',
    name: 'Dog Grooming',
    shortName: 'Grooming',
    tagline: 'Professional grooming, coming to your doorstep',
    description:
      'At-home dog grooming services by trained professionals. Bath, haircut, nail trimming, ear cleaning, and more — all in the comfort of your home.',
    metaDescription:
      'Professional at-home dog grooming service in Mumbai. Bath, haircut, nail trimming & more. Join the waitlist for Platypus Grooming.',
    keywords: [
      'dog grooming Mumbai',
      'pet grooming at home',
      'dog bath service',
      'dog haircut Mumbai',
      'mobile dog grooming',
    ],
    icon: 'Scissors',
    status: 'coming-soon',
    features: [
      'At-home grooming convenience',
      'Trained & certified groomers',
      'Full bath & blow-dry',
      'Breed-specific haircuts',
      'Nail trimming & ear cleaning',
      'Skin & coat health checks',
    ],
    image: '/hero-image.png',
  },
  'dog-training': {
    slug: 'dog-training',
    name: 'Dog Training',
    shortName: 'Training',
    tagline: 'Positive reinforcement training for happier dogs',
    description:
      'Professional dog training using positive reinforcement techniques. Obedience training, behavior correction, socialization, and puppy training by certified trainers.',
    metaDescription:
      'Professional dog training service in Mumbai. Positive reinforcement, obedience training & behavior correction. Join the waitlist for Platypus Training.',
    keywords: [
      'dog training Mumbai',
      'puppy training',
      'dog obedience training',
      'dog behavior training',
      'certified dog trainer Mumbai',
    ],
    icon: 'GraduationCap',
    status: 'coming-soon',
    features: [
      'Positive reinforcement methods',
      'Certified professional trainers',
      'Basic & advanced obedience',
      'Behavior modification',
      'Puppy socialization programs',
      'In-home & outdoor sessions',
    ],
    image: '/hero-image.png',
  },
  'pet-sitting': {
    slug: 'pet-sitting',
    name: 'Pet Sitting',
    shortName: 'Sitting',
    tagline: 'Trusted care when you\'re away',
    description:
      'Reliable pet sitting service for when you travel or work late. Your dog stays in trusted hands with our verified sitters who provide love, attention, and all the care your pet needs.',
    metaDescription:
      'Trusted pet sitting service in Mumbai. Verified sitters, daily updates & photos. Join the waitlist for Platypus Pet Sitting.',
    keywords: [
      'pet sitting Mumbai',
      'dog sitting service',
      'dog boarding Mumbai',
      'pet care while traveling',
      'overnight dog care',
    ],
    icon: 'Home',
    status: 'coming-soon',
    features: [
      'Verified & trusted sitters',
      'Daily photo & video updates',
      'Follows your dog\'s routine',
      'Medication administration',
      'Overnight & extended stays',
      'In-home sitting (your place or theirs)',
    ],
    image: '/hero-image.png',
  },
};

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services[slug];
}

export function getAllServiceSlugs(): string[] {
  return Object.keys(services);
}

export function getActiveServices(): ServiceData[] {
  return Object.values(services).filter((s) => s.status === 'active');
}

export function getComingSoonServices(): ServiceData[] {
  return Object.values(services).filter((s) => s.status === 'coming-soon');
}
