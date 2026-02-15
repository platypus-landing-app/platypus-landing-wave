import type { BlogPostFull, BlogPostMeta } from './types';

// Import all blog posts
import { post as whyEveryPetParent } from './posts/why-every-pet-parent-should-consider-dog-walking-service';
import { post as scienceOfDogWalking } from './posts/the-science-of-dog-walking';
import { post as howToChooseDogWalker } from './posts/how-to-choose-right-dog-walker-mumbai';
import { post as morningVsEvening } from './posts/benefits-of-morning-vs-evening-dog-walks';
import { post as monsoonSafety } from './posts/dog-walking-safety-tips-mumbai-monsoon';
import { post as gpsTracking } from './posts/how-gps-tracking-keeps-your-dog-safe';
import { post as socializingDog } from './posts/socializing-your-dog-through-walks';
import { post as bodyLanguage } from './posts/understanding-dog-body-language-walks';
import { post as indoorVsOutdoor } from './posts/indoor-vs-outdoor-exercise-for-dogs';
import { post as firstProfessionalWalk } from './posts/preparing-your-dog-for-first-professional-walk';
import { post as certifiedWalkers } from './posts/why-certified-dog-walkers-matter';
import { post as scheduleByBreed } from './posts/dog-walking-schedule-by-breed';
import { post as becomeDogWalker } from './posts/become-professional-dog-walker-india';
import { post as groomingBasics } from './posts/pet-grooming-basics-guide';
import { post as howMuchExercise } from './posts/how-much-exercise-does-my-dog-need';
import { post as walkingVsPark } from './posts/dog-walking-vs-dog-park-which-is-better';
import { post as topRoutesMumbai } from './posts/top-dog-walking-routes-mumbai';
import { post as signsNeedExercise } from './posts/signs-dog-needs-more-exercise';
import { post as summerSafety } from './posts/summer-dog-walking-safety-mumbai';
import { post as firstTimeDogParent } from './posts/first-time-dog-parent-guide';

// Registry of all posts (sorted by date in getPublishedPosts)
const allPosts: BlogPostFull[] = [
  whyEveryPetParent,
  scienceOfDogWalking,
  howToChooseDogWalker,
  morningVsEvening,
  monsoonSafety,
  gpsTracking,
  socializingDog,
  bodyLanguage,
  indoorVsOutdoor,
  firstProfessionalWalk,
  certifiedWalkers,
  scheduleByBreed,
  becomeDogWalker,
  groomingBasics,
  howMuchExercise,
  walkingVsPark,
  topRoutesMumbai,
  signsNeedExercise,
  summerSafety,
  firstTimeDogParent,
];

/** Returns all published posts sorted by date (newest first) */
export function getPublishedPosts(): BlogPostFull[] {
  return allPosts
    .filter(p => p.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Returns a single post by slug */
export function getBlogPostBySlug(slug: string): BlogPostFull | undefined {
  return allPosts.find(p => p.slug === slug && p.status === 'published');
}

/** Returns related posts for a given slug */
export function getRelatedPosts(slug: string, limit = 3): BlogPostFull[] {
  const post = allPosts.find(p => p.slug === slug);
  if (!post) return [];

  // First try relatedSlugs
  const related = post.relatedSlugs
    .map(s => allPosts.find(p => p.slug === s && p.status === 'published'))
    .filter((p): p is BlogPostFull => !!p);

  // If not enough, fill with same-category posts
  if (related.length < limit) {
    const sameCat = allPosts.filter(
      p => p.slug !== slug && p.status === 'published' && p.category === post.category && !related.includes(p)
    );
    related.push(...sameCat);
  }

  // If still not enough, fill with any remaining published posts
  if (related.length < limit) {
    const remaining = allPosts.filter(
      p => p.slug !== slug && p.status === 'published' && !related.includes(p)
    );
    related.push(...remaining);
  }

  return related.slice(0, limit);
}

/** Returns posts filtered by tag */
export function getPostsByTag(tag: string): BlogPostFull[] {
  return getPublishedPosts().filter(p => p.tags.includes(tag));
}

/** Returns all unique categories from published posts */
export function getAllCategories(): string[] {
  const categories = getPublishedPosts().map(p => p.category);
  return [...new Set(categories)];
}

/** Returns all unique tags from published posts */
export function getAllTags(): string[] {
  const tags = getPublishedPosts().flatMap(p => p.tags);
  return [...new Set(tags)];
}

// Re-export types
export type { BlogPostFull, BlogPostMeta } from './types';
