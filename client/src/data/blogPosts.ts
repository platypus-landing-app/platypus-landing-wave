// src/data/blogPosts.ts

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    metaDescription: string;
    keywords: string[];
}

export const blogPosts: BlogPost[] = [
    {
        slug: "why-every-pet-parent-should-consider-dog-walking-service",
        title: "Why Every Pet Parent Should Consider a Dog Walking Service",
        excerpt: "Being a pet parent is one of life's greatest joys, but it also comes with responsibilities. In fast-paced metro cities, long commutes and demanding work schedules make it difficult to give your dogs the regular walks they truly need.",
        author: "Platypus Team",
        date: "2025-10-12",
        readTime: "4 min read",
        category: "Pet Care Tips",
        image: "/why-dog-walking-service.png",
        metaDescription: "Discover why professional dog walking services are essential for busy pet parents in metro cities. Learn how Platypus helps keep your dog healthy, happy, and safe.",
        keywords: [
            "dog walking service",
            "professional dog walkers",
            "pet care Mumbai",
            "busy pet parents",
            "dog exercise routine",
            "dog walking benefits"
        ],
        content: `
Being a pet parent is one of life's greatest joys, but it also comes with responsibilities. In fast-paced metro cities, long commutes, demanding work schedules, and packed daily routines make it difficult for many pet parents to give their dogs the regular walks they truly need. Between family commitments, errands, and household chores, finding time for consistent exercise for your dog can feel impossible. That is where a professional dog walking service steps in to make life easier for both you and your pup.

## Consistent Exercise for Better Health

Dogs thrive on routine physical activity. Regular walks keep their weight in check, strengthen muscles and joints, and support heart health. For high-energy breeds, it is the perfect outlet to release pent-up energy and prevent obesity or arthritis.

## Mental Stimulation Beyond the Backyard

Walks are more than exercise. They are mental workouts. Every new scent, sight and sound stimulates your dog's brain and keeps them sharp. Without this stimulation, dogs often become restless, anxious, or even destructive at home.

## Happier, Calmer Pets

Just like humans, dogs benefit emotionally from exercise. Walks release endorphins, reduce stress and help them stay calmer indoors. A well-walked dog sleeps better, barks less and enjoys a more balanced mood.

## Peace of Mind for Pet Parents

With a reliable dog walking service, you no longer need to worry about missed walks during long office hours or hectic days. Professional walkers ensure your dog gets safe, structured and timely exercise so you can focus on your commitments without guilt.

## The Platypus Promise

At **Platypus**, our trained Guardians go beyond simply taking your dog out. We provide guided, safe and engaging walks tailored to your pet's breed, age and energy level. Our reliable service ensures that your dog is always in trusted hands, with strict safety protocols to prevent accidents or any harm. Regular, scheduled walks help maintain consistency in your pet's routine, while our secure practices and verified walkers help protect dogs from potential crimes or unsafe situations. Every walk is not just a necessity; it is an opportunity to keep your dog healthy, happy and safe.

Give your pup the care they deserve. With **Platypus**, every step is a step toward a healthier, happier and secure life for your companion.
    `
    },
    {
        slug: "the-science-of-dog-walking",
        title: "The Science of Dog Walking: What Happens to Your Pup's Body & Brain",
        excerpt: "Dog walking may look like a simple daily routine, but science shows it's one of the most powerful ways to keep your pup healthy both physically and mentally.",
        author: "Platypus Team",
        date: "2025-10-10",
        readTime: "5 min read",
        category: "Pet Health",
        image: "/science-of-dog-walking.png",
        metaDescription: "Discover the science behind dog walking and how it benefits your dog's physical health, mental stimulation, and emotional well-being. Learn from Platypus experts.",
        keywords: [
            "dog walking benefits",
            "dog health",
            "pet exercise",
            "dog mental stimulation",
            "dog walking science",
            "Mumbai dog walking"
        ],
        content: `
Dog walking may look like a simple daily routine, but science shows it's one of the most powerful ways to keep your pup healthy both physically and mentally. And dog parents must know about it.

## Stronger Body, Healthier Heart

Regular walks keep your dog's muscles and bones strong. Movement helps lubricate joints, reducing stiffness and lowering the risk of arthritis, especially as dogs age. Walking also supports cardiovascular health—keeping your dog's heart and lungs functioning efficiently, just like cardio workouts do for humans. Over time, consistent walks can extend your dog's lifespan and improve their overall quality of life.

## Weight Control and Digestion

Obesity is one of the most common health issues in pets. Even a short, brisk walk can burn calories and regulate metabolism, helping maintain a healthy weight. Walks also stimulate the digestive system, promoting better gut health and reducing problems like constipation or bloating.

## Brain and Sensory Stimulation

Dogs see the world through their noses. Every new scent during a walk activates areas of their brain tied to memory and learning. This sensory engagement is like a workout for their mind, preventing boredom and sharpening cognitive skills. Dogs that don't get enough mental stimulation often develop destructive habits or anxiety.

## Mood and Emotional Balance

Exercise triggers endorphin release—the "happy hormones" that lower stress and improve mood. A well-exercised dog is calmer, sleeps better, and is less likely to develop behavioral issues such as barking, chewing, or hyperactivity.

## The Platypus Approach

At **Platypus**, our Guardians (trained walkers) don't just stroll—they provide guided, safe and breed-appropriate walks that maximize health benefits. Every outing is tailored to balance exercise, exploration, and rest, ensuring your dog thrives inside and out.

Dog walking isn't just a chore; it's science-backed care that keeps your pup healthier and happier every single day.
    `
    }
];

// Helper function to get a single post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
    return blogPosts.find(post => post.slug === slug);
};

// Helper function to get related posts (excluding current post)
export const getRelatedPosts = (currentSlug: string, limit: number = 3): BlogPost[] => {
    return blogPosts
        .filter(post => post.slug !== currentSlug)
        .slice(0, limit);
};