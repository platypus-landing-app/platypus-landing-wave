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
import { post as dobermanGuide } from './posts/doberman-exercise-walking-guide';
import { post as cockerSpanielGuide } from './posts/cocker-spaniel-exercise-walking-guide';
import { post as poodleGuide } from './posts/poodle-exercise-walking-guide';
import { post as boxerGuide } from './posts/boxer-exercise-walking-guide';
import { post as huskyGuide } from './posts/husky-exercise-walking-guide';
import { post as dalmatianGuide } from './posts/dalmatian-exercise-walking-guide';
import { post as greatDaneGuide } from './posts/great-dane-exercise-walking-guide';
import { post as guideBandra } from './posts/dog-walking-guide-bandra';
import { post as guideAndheri } from './posts/dog-walking-guide-andheri';
import { post as guidePowai } from './posts/dog-walking-guide-powai';
import { post as guideWorli } from './posts/dog-walking-guide-worli';
import { post as guideJuhu } from './posts/dog-walking-guide-juhu';
import { post as guideThane } from './posts/dog-walking-guide-thane';
import { post as guideLowerParel } from './posts/dog-walking-guide-lower-parel';
import { post as guideColaba } from './posts/dog-walking-guide-colaba';
import { post as guideVersova } from './posts/dog-walking-guide-versova';
import { post as guideMalad } from './posts/dog-walking-guide-malad';
import { post as guideBorivali } from './posts/dog-walking-guide-borivali';
import { post as guideKandivali } from './posts/dog-walking-guide-kandivali';
import { post as guideSantacruz } from './posts/dog-walking-guide-santacruz';
import { post as guideKhar } from './posts/dog-walking-guide-khar';
import { post as guideByculla } from './posts/dog-walking-guide-byculla';
import { post as guideDadar } from './posts/dog-walking-guide-dadar';
import { post as labradorGuide } from './posts/labrador-exercise-walking-guide';
import { post as goldenRetrieverGuide } from './posts/golden-retriever-exercise-walking-guide';
import { post as germanShepherdGuide } from './posts/german-shepherd-exercise-walking-guide';
import { post as beagleGuide } from './posts/beagle-exercise-walking-guide';
import { post as pugGuide } from './posts/pug-exercise-walking-guide';
import { post as shihTzuGuide } from './posts/shih-tzu-exercise-walking-guide';
import { post as indieDogGuide } from './posts/indie-dog-exercise-walking-guide';
import { post as rottweilerGuide } from './posts/rottweiler-exercise-walking-guide';
import { post as guideMatunga } from './posts/dog-walking-guide-matunga';
import { post as guideKurla } from './posts/dog-walking-guide-kurla';
import { post as guideChembur } from './posts/dog-walking-guide-chembur';
import { post as guideGhatkopar } from './posts/dog-walking-guide-ghatkopar';
import { post as guideMulund } from './posts/dog-walking-guide-mulund';
import { post as guideNaviMumbai } from './posts/dog-walking-guide-navi-mumbai';
import { post as guideVileParle } from './posts/dog-walking-guide-vile-parle';
import { post as guideGoregaon } from './posts/dog-walking-guide-goregaon';

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
  dobermanGuide,
  cockerSpanielGuide,
  poodleGuide,
  boxerGuide,
  huskyGuide,
  dalmatianGuide,
  greatDaneGuide,
  guideBandra,
  guideAndheri,
  guidePowai,
  guideWorli,
  guideJuhu,
  guideThane,
  guideLowerParel,
  guideColaba,
  guideVersova,
  guideMalad,
  guideBorivali,
  guideKandivali,
  guideSantacruz,
  guideKhar,
  guideByculla,
  guideDadar,
  labradorGuide,
  goldenRetrieverGuide,
  germanShepherdGuide,
  beagleGuide,
  pugGuide,
  shihTzuGuide,
  indieDogGuide,
  rottweilerGuide,
  guideMatunga,
  guideKurla,
  guideChembur,
  guideGhatkopar,
  guideMulund,
  guideNaviMumbai,
  guideVileParle,
  guideGoregaon,
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
