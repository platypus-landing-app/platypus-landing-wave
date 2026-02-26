// Centralized location data for SEO and UI consistency
// This ensures AreasWeServe and LocationPage are always in sync

export interface LocationFAQ {
  question: string;
  answer: string;
}

export interface LocationReview {
  author: string;
  rating: number;
  text: string;
  date: string; // ISO date
}

export interface LocationData {
  name: string;
  displayName: string;
  slug: string; // URL-friendly version for routing
  description: string;
  landmarks: string[];
  neighborhoods: string[];
  coordinates: { lat: number; lng: number };
  nearbyAreas: string[]; // Slugs of geographically nearby locations
  faq: LocationFAQ[];
  reviews: LocationReview[];
}

export const locations: Record<string, LocationData> = {
  "mira-road": {
    name: "Mira Road",
    displayName: "Mira Road",
    slug: "mira-road",
    description:
      "professional dog walking service in Mira Road with certified Guardians covering Mira Road East, West, and surrounding areas",
    landmarks: ["Mira Road Station", "Highway Gardens", "Silver Park"],
    neighborhoods: ["Mira Road East", "Mira Road West", "Kashimira", "Beverly Park"],
    coordinates: { lat: 19.2812, lng: 72.8685 },
    nearbyAreas: ["borivali", "kandivali"],
    faq: [
      {
        question: "Do you provide dog walking in Mira Road East and West?",
        answer: "Yes, our certified Guardians cover both Mira Road East and West, including Kashimira, Beverly Park, and Highway Gardens areas. We assign a local Guardian for consistent, punctual service.",
      },
      {
        question: "What walking routes do Guardians use in Mira Road?",
        answer: "Our Guardians use residential society gardens, quieter internal roads, and green spaces in Mira Road. We select shaded routes and avoid busy highways for safe, comfortable walks.",
      },
      {
        question: "Can I book a trial walk in Mira Road?",
        answer: "Yes! Our ₹199 trial walk is available across Mira Road. It's a great way to see how your dog responds to a certified Guardian before committing to a monthly plan.",
      },
    ],
    reviews: [
      {
        author: "Priyanka Soni",
        rating: 5,
        text: "Finally a professional dog walking service in Mira Road! Our Guardian is punctual, caring, and our Labrador loves his morning walks. The GPS tracking gives us complete peace of mind.",
        date: "2025-02-15",
      },
      {
        author: "Rahul Sharma",
        rating: 5,
        text: "We were hesitant about professional dog walking, but the Platypus trial walk in Mira Road convinced us. Our Indie dog is happier and calmer since starting regular walks.",
        date: "2025-02-20",
      },
    ],
  },
  borivali: {
    name: "Borivali",
    displayName: "Borivali West & East",
    slug: "borivali",
    description:
      "professional dog walking service in Borivali with trained Guardians near Sanjay Gandhi National Park",
    landmarks: ["Sanjay Gandhi National Park", "Gorai Beach", "EsselWorld"],
    neighborhoods: ["Borivali West", "Borivali East", "IC Colony", "Shimpoli"],
    coordinates: { lat: 19.2305, lng: 72.8567 },
    nearbyAreas: ["mira-road", "kandivali", "malad", "goregaon"],
    faq: [
      {
        question: "Can dogs walk near Sanjay Gandhi National Park with Platypus?",
        answer: "Our Guardians walk dogs in the residential areas surrounding SGNP and along park-adjacent lanes. We follow all local guidelines and keep dogs on-leash in areas near the park for wildlife safety.",
      },
      {
        question: "Do you serve IC Colony and Shimpoli in Borivali?",
        answer: "Yes, we cover IC Colony, Shimpoli, Borivali West, and Borivali East. IC Colony's quiet lanes are particularly good for peaceful dog walks.",
      },
    ],
    reviews: [
      {
        author: "Maria D'Souza",
        rating: 5,
        text: "Living near SGNP, the walking options are amazing. Our Guardian takes our Indie mix on lovely nature-adjacent walks. The photo updates always make my day.",
        date: "2025-01-19",
      },
      {
        author: "Kunal Sawant",
        rating: 5,
        text: "Professional, reliable, and affordable. Our two dogs in Borivali get walked twice daily and the Guardians handle both of them with ease.",
        date: "2025-02-07",
      },
    ],
  },
  kandivali: {
    name: "Kandivali",
    displayName: "Kandivali West & East",
    slug: "kandivali",
    description:
      "certified dog walking service in Kandivali with GPS tracking and professional Guardians",
    landmarks: ["Thakur Mall", "Mahavir Nagar", "Growel's Mall"],
    neighborhoods: ["Kandivali West", "Kandivali East", "Thakur Village", "Poisar"],
    coordinates: { lat: 19.2074, lng: 72.8479 },
    nearbyAreas: ["mira-road", "borivali", "malad", "goregaon", "andheri"],
    faq: [
      {
        question: "Is Platypus available in Thakur Village and Poisar?",
        answer: "Yes, our Guardians cover all of Kandivali including Thakur Village, Poisar, Mahavir Nagar, and both West and East sides. We assign a local Guardian for reliable daily service.",
      },
      {
        question: "How do you select walking routes in Kandivali?",
        answer: "Our Guardians use residential society compounds, garden areas, and quieter lanes in Kandivali. We avoid busy main roads and select routes with shade, especially during warmer months.",
      },
    ],
    reviews: [
      {
        author: "Pooja Thakkar",
        rating: 5,
        text: "Our Lhasa Apso is fussy about new people but bonded with the Guardian within a week. The Kandivali walks are consistent and our dog is visibly happier.",
        date: "2025-01-21",
      },
      {
        author: "Manish Gupta",
        rating: 5,
        text: "Great value for money in Kandivali. The trial walk convinced us immediately. The Guardian is professional and our Beagle can't wait for walk time.",
        date: "2025-02-09",
      },
    ],
  },
  malad: {
    name: "Malad",
    displayName: "Malad West & East",
    slug: "malad",
    description:
      "certified dog walking service in Malad covering Malad West and Malad East areas",
    landmarks: ["Inorbit Mall", "Mindspace", "Malad Station", "Infiniti Mall"],
    neighborhoods: ["Malad West", "Malad East", "Mindspace", "Orlem"],
    coordinates: { lat: 19.1864, lng: 72.8493 },
    nearbyAreas: ["kandivali", "goregaon", "andheri", "borivali"],
    faq: [
      {
        question: "Do you provide dog walking in Malad West and Malad East?",
        answer: "Yes, our Guardians cover both Malad West (Orlem, Evershine Nagar) and Malad East (Kurar, Mindspace area). We assign a local Guardian for consistency and punctuality.",
      },
      {
        question: "What green spaces do Guardians use for walks in Malad?",
        answer: "Our Guardians use residential garden areas, Evershine Park, and quieter lanes away from the main road. For larger dogs, we select routes with more open space and shade.",
      },
    ],
    reviews: [
      {
        author: "Deepika Jain",
        rating: 5,
        text: "Our German Shepherd needs long, structured walks. The Guardian in Malad West knows exactly which routes work best and our dog comes back tired and happy.",
        date: "2025-01-16",
      },
      {
        author: "Varun Mehta",
        rating: 5,
        text: "We moved to Malad from Bandra and continued with Platypus. Seamless transition, equally great Guardian assigned. The service is consistent across areas.",
        date: "2025-02-04",
      },
    ],
  },
  goregaon: {
    name: "Goregaon",
    displayName: "Goregaon East",
    slug: "goregaon",
    description:
      "certified dog walking service in Goregaon with GPS tracking and professional Guardians",
    landmarks: ["Film City", "Aarey Colony", "Goregaon Station", "Oberoi Mall"],
    neighborhoods: ["Goregaon East", "Aarey Colony", "Motilal Nagar"],
    coordinates: { lat: 19.1656, lng: 72.8498 },
    nearbyAreas: ["malad", "kandivali", "andheri", "borivali"],
    faq: [
      {
        question: "Can my dog walk near Aarey Colony with Platypus?",
        answer: "Our Guardians use walking routes near Aarey Colony's green fringes and residential areas in Goregaon. The natural surroundings provide enriching walks for dogs who enjoy nature.",
      },
      {
        question: "Do you cover Goregaon East and Film City area?",
        answer: "Yes, we serve Goregaon East, Motilal Nagar, and areas near Film City. Our locally assigned Guardian ensures consistent, timely walks every day.",
      },
    ],
    reviews: [
      {
        author: "Sandeep Rathod",
        rating: 5,
        text: "The nature walks near Aarey Colony are amazing for our Indie dog. She comes back refreshed. The Guardian is experienced and our dog adores him.",
        date: "2025-01-07",
      },
      {
        author: "Jyoti Bhatt",
        rating: 5,
        text: "Goregaon East needed a good dog walking service and Platypus delivered. Professional Guardian, GPS tracking, and daily updates. Everything we needed.",
        date: "2025-02-09",
      },
    ],
  },
  andheri: {
    name: "Andheri",
    displayName: "Andheri West & East",
    slug: "andheri",
    description:
      "certified dog walking service in Andheri covering Andheri West, Andheri East, and nearby localities",
    landmarks: ["Lokhandwala", "Versova", "Oshiwara", "Jogeshwari"],
    neighborhoods: ["Andheri West", "Andheri East", "Versova", "Oshiwara"],
    coordinates: { lat: 19.1136, lng: 72.8697 },
    nearbyAreas: ["juhu", "goregaon", "malad", "bandra", "khar"],
    faq: [
      {
        question: "Do you cover Lokhandwala and Oshiwara in Andheri?",
        answer: "Yes, we have dedicated Guardians across Andheri West including Lokhandwala Complex, Oshiwara, and Four Bungalows. Andheri East localities like MIDC and Marol are also covered.",
      },
      {
        question: "How do you handle heavy traffic areas in Andheri during walks?",
        answer: "Our Guardians are trained in urban safety protocols. They use designated walking paths, avoid peak traffic zones, and always keep dogs on secure leashes. We select quiet, green routes even in busy areas like Andheri.",
      },
      {
        question: "Can I book a trial walk in Andheri for my puppy?",
        answer: "Yes! Our ₹199 trial walk is available across Andheri. For puppies, we match you with a Guardian experienced in handling young dogs and adjust walk duration to suit your puppy's energy level.",
      },
    ],
    reviews: [
      {
        author: "Priya Deshmukh",
        rating: 5,
        text: "Living in Lokhandwala, finding a reliable dog walker was tough until Platypus. Our Guardian is punctual, caring, and our Shih Tzu absolutely adores him.",
        date: "2025-01-05",
      },
      {
        author: "Rahul Kapoor",
        rating: 5,
        text: "The GPS tracking feature sold me. I can see exactly where my dog walks in Oshiwara. The photo updates after every walk are a lovely touch.",
        date: "2025-02-01",
      },
    ],
  },
  juhu: {
    name: "Juhu",
    displayName: "Juhu",
    slug: "juhu",
    description:
      "professional dog walking service in Juhu Beach area with certified pet care Guardians",
    landmarks: ["Juhu Beach", "ISKCON Temple", "Juhu Chowpatty"],
    neighborhoods: ["Juhu", "Juhu Scheme", "Juhu Tara Road"],
    coordinates: { lat: 19.0990, lng: 72.8265 },
    nearbyAreas: ["andheri", "bandra", "khar"],
    faq: [
      {
        question: "Can my dog walk on Juhu Beach with a Platypus Guardian?",
        answer: "Our Guardians walk dogs near Juhu Beach during early morning hours when it's less crowded. We follow beach safety protocols and keep dogs on-leash at all times near the shore.",
      },
      {
        question: "What walking routes do you use in Juhu?",
        answer: "Popular routes include the Juhu Beach promenade, ISKCON Temple gardens area, and quiet residential lanes in Juhu Scheme. Our Guardians choose routes based on your dog's needs.",
      },
    ],
    reviews: [
      {
        author: "Ananya Sharma",
        rating: 5,
        text: "Morning beach walks in Juhu have transformed our Indie's energy levels. She comes back happy and tired. The walk reports are detailed and reassuring.",
        date: "2025-01-08",
      },
      {
        author: "Rohan Patel",
        rating: 5,
        text: "Consistent and reliable — our Guardian has not missed a single walk in 3 months. Living in Juhu, we couldn't ask for a better dog walking service.",
        date: "2025-02-10",
      },
    ],
  },
  bandra: {
    name: "Bandra",
    displayName: "Bandra West",
    slug: "bandra",
    description:
      "professional dog walking service in Bandra with certified Guardians covering Bandra West and surrounding areas",
    landmarks: ["Carter Road", "Bandstand", "Linking Road", "Hill Road"],
    neighborhoods: ["Bandra West", "Pali Hill", "Bandra Reclamation"],
    coordinates: { lat: 19.0596, lng: 72.8295 },
    nearbyAreas: ["khar", "juhu", "andheri", "dadar"],
    faq: [
      {
        question: "Do you provide dog walking near Carter Road and Bandstand in Bandra?",
        answer: "Yes, our certified Guardians walk dogs daily along Carter Road, Bandstand, and other popular Bandra routes. These areas are ideal for structured walks with sea breeze and ample space.",
      },
      {
        question: "What time slots are available for dog walking in Bandra?",
        answer: "We offer morning (6 AM–10 AM) and evening (4 PM–8 PM) slots in Bandra West. You can choose a fixed slot that works best for your dog's routine.",
      },
      {
        question: "Is Platypus available in Pali Hill and Bandra Reclamation?",
        answer: "Absolutely. Our Guardians cover all of Bandra West including Pali Hill, Bandra Reclamation, Hill Road, and Linking Road areas. We assign a Guardian who lives nearby for consistency.",
      },
    ],
    reviews: [
      {
        author: "Sneha Pandey",
        rating: 5,
        text: "I would definitely recommend Platypus. The Guardians provided by your team are well-trained, trustworthy & clearly care about the pet they walk.",
        date: "2024-12-15",
      },
      {
        author: "Arjun Mehra",
        rating: 5,
        text: "Our Lab loves his Carter Road walks with the Guardian. The GPS tracking gives us real peace of mind while we're at work. Best service in Bandra.",
        date: "2025-01-20",
      },
    ],
  },
  khar: {
    name: "Khar",
    displayName: "Khar",
    slug: "khar",
    description:
      "certified dog walking service in Khar with professional Guardians near Khar Danda",
    landmarks: ["Khar Danda", "Khar Station", "Linking Road"],
    neighborhoods: ["Khar West", "Khar East", "Khar Danda", "St. Teresa"],
    coordinates: { lat: 19.0703, lng: 72.8397 },
    nearbyAreas: ["bandra", "juhu", "andheri", "dadar"],
    faq: [
      {
        question: "Do you walk dogs near Khar Danda and Linking Road?",
        answer: "Yes, Khar Danda's quiet lanes and the tree-lined streets near Linking Road are popular walking routes for our Guardians. We select routes that balance exercise with safety.",
      },
      {
        question: "Is there a separate Guardian for Khar and nearby Bandra?",
        answer: "We typically assign area-specific Guardians. Your Khar Guardian will be based locally. However, since Khar and Bandra are adjacent, a Guardian may cover both if it suits scheduling.",
      },
    ],
    reviews: [
      {
        author: "Neha Singhania",
        rating: 5,
        text: "Our puppy's first professional walks in Khar have been great. The Guardian is gentle, patient, and sends us the cutest walk photos every day.",
        date: "2025-01-13",
      },
      {
        author: "Ravi Mehta",
        rating: 5,
        text: "We've tried three dog walking services in Khar. Platypus is the only one that's been consistent for months. The Guardian genuinely bonds with our dog.",
        date: "2025-02-02",
      },
    ],
  },
  dadar: {
    name: "Dadar",
    displayName: "Dadar",
    slug: "dadar",
    description:
      "certified dog walking service in Dadar covering Dadar West and Dadar East with GPS tracking",
    landmarks: ["Shivaji Park", "Dadar Flower Market", "Siddhivinayak Temple"],
    neighborhoods: ["Dadar West", "Dadar East", "Shivaji Park", "Hindmata"],
    coordinates: { lat: 19.0176, lng: 72.8464 },
    nearbyAreas: ["prabhadevi", "lower-parel", "wadala", "bandra", "khar", "kurla"],
    faq: [
      {
        question: "Can my dog walk at Shivaji Park in Dadar?",
        answer: "Shivaji Park and its surrounding lanes are among our most popular walking spots in Dadar. Our Guardians use the park's open spaces during quieter morning and evening hours.",
      },
      {
        question: "Do you cover Dadar East and Hindmata?",
        answer: "Yes, we serve Dadar West, Dadar East, Hindmata, and areas near Siddhivinayak Temple. Our Guardians select walking routes with greenery and minimal traffic.",
      },
    ],
    reviews: [
      {
        author: "Prachi Joshi",
        rating: 5,
        text: "Shivaji Park walks have been a blessing for our energetic Boxer. The Guardian lets him run in the open space and our dog comes back exhausted and happy.",
        date: "2025-01-09",
      },
      {
        author: "Suresh Nair",
        rating: 5,
        text: "We've been using Platypus in Dadar for 4 months now. Not a single missed walk. The Guardian treats our dog like family. Outstanding service.",
        date: "2025-01-26",
      },
    ],
  },
  wadala: {
    name: "Wadala",
    displayName: "Wadala",
    slug: "wadala",
    description:
      "professional dog walking service in Wadala with certified Guardians and live GPS tracking",
    landmarks: ["Five Gardens", "Wadala Station", "IMAX Wadala"],
    neighborhoods: ["Wadala East", "Wadala West", "Antop Hill", "Naigaon"],
    coordinates: { lat: 19.0178, lng: 72.8650 },
    nearbyAreas: ["dadar", "prabhadevi", "lower-parel", "kurla", "chembur"],
    faq: [
      {
        question: "Do you walk dogs near Five Gardens in Wadala?",
        answer: "Yes, Five Gardens and its surrounding residential lanes are among our favourite walking spots in Wadala. The garden paths provide shaded, comfortable routes for dogs of all sizes.",
      },
      {
        question: "Is Platypus available in Antop Hill and Wadala East?",
        answer: "We cover all of Wadala including Antop Hill, Wadala East, Wadala West, and Naigaon. Our locally assigned Guardian ensures consistent, timely service.",
      },
      {
        question: "Can I book a trial walk in Wadala?",
        answer: "Yes! Our ₹199 trial walk is available across Wadala. It includes a home introduction with your Guardian, a full walk with GPS tracking, and a detailed walk report.",
      },
    ],
    reviews: [
      {
        author: "Nikita Desai",
        rating: 5,
        text: "The Five Gardens walks are perfect for our Cocker Spaniel. The Guardian in Wadala is always punctual and our dog looks forward to walk time every morning.",
        date: "2025-02-12",
      },
      {
        author: "Amit Kulkarni",
        rating: 5,
        text: "Reliable and professional service in Wadala. The GPS tracking is excellent — we can see exactly where our dog walks. Highly recommend Platypus.",
        date: "2025-02-18",
      },
    ],
  },
  prabhadevi: {
    name: "Prabhadevi",
    displayName: "Prabhadevi",
    slug: "prabhadevi",
    description:
      "certified dog walking service in Prabhadevi with professional Guardians and safety protocols",
    landmarks: ["Siddhivinayak Temple", "Prabhadevi Station", "Worli Sea Face"],
    neighborhoods: ["Prabhadevi", "Worli Naka", "Parel Village"],
    coordinates: { lat: 19.0120, lng: 72.8280 },
    nearbyAreas: ["dadar", "lower-parel", "wadala", "grant-road"],
    faq: [
      {
        question: "Do your Guardians walk dogs near Siddhivinayak Temple in Prabhadevi?",
        answer: "Yes, the quieter residential lanes around Prabhadevi and near Siddhivinayak Temple are regular walking routes. Our Guardians select peaceful, shaded paths away from busy temple traffic.",
      },
      {
        question: "Is Platypus available near Worli Sea Face from Prabhadevi?",
        answer: "Our Prabhadevi Guardians can walk dogs along the nearby seafront promenade during early morning hours. We select routes based on your dog's energy level and the time of day.",
      },
    ],
    reviews: [
      {
        author: "Meera Bhatia",
        rating: 5,
        text: "The seafront walks near Prabhadevi are the highlight of our Beagle's day. The Guardian is incredibly patient and our dog runs to greet him every morning!",
        date: "2025-01-15",
      },
      {
        author: "Karan Malhotra",
        rating: 5,
        text: "We were nervous about leaving our rescue dog with a walker, but the Platypus Guardian built trust so quickly. GPS tracking is a game changer.",
        date: "2025-02-05",
      },
    ],
  },
  "lower-parel": {
    name: "Lower Parel",
    displayName: "Lower Parel",
    slug: "lower-parel",
    description:
      "professional dog walking service in Lower Parel with trained certified Guardians",
    landmarks: ["Phoenix Mills", "High Street Phoenix", "Kamala Mills"],
    neighborhoods: ["Lower Parel", "Elphinstone", "Sewri"],
    coordinates: { lat: 19.0008, lng: 72.8300 },
    nearbyAreas: ["prabhadevi", "dadar", "grant-road", "wadala"],
    faq: [
      {
        question: "Where do Guardians walk dogs in Lower Parel?",
        answer: "Our Guardians use quieter residential lanes and garden areas around Lower Parel, avoiding the busy commercial zones near Phoenix Mills during peak hours. We select routes with shade and minimal traffic.",
      },
      {
        question: "Can I schedule walks around my work hours in Lower Parel?",
        answer: "Absolutely. Many of our Lower Parel pet parents work in the area's offices. We offer flexible morning and evening slots, and your Guardian can coordinate key pickup and drop-off around your schedule.",
      },
    ],
    reviews: [
      {
        author: "Nisha Menon",
        rating: 5,
        text: "We work long hours and knowing our Pomeranian gets her daily walks with a caring Guardian in Lower Parel is such a relief. The GPS tracking is the cherry on top.",
        date: "2025-01-12",
      },
      {
        author: "Aditya Rao",
        rating: 5,
        text: "Switched from another service and the difference is night and day. Platypus Guardians in Lower Parel are professional, punctual, and genuinely love dogs.",
        date: "2025-01-28",
      },
    ],
  },
  "grant-road": {
    name: "Grant Road",
    displayName: "Grant Road",
    slug: "grant-road",
    description:
      "professional dog walking service in Grant Road with certified Guardians covering Grant Road, Charni Road, and surrounding areas",
    landmarks: ["Girgaon Chowpatty", "August Kranti Maidan", "Grant Road Station"],
    neighborhoods: ["Grant Road", "Charni Road", "Girgaon", "Opera House"],
    coordinates: { lat: 18.9630, lng: 72.8150 },
    nearbyAreas: ["lower-parel", "prabhadevi", "dadar"],
    faq: [
      {
        question: "Do you provide dog walking near Girgaon Chowpatty and Grant Road?",
        answer: "Yes, our Guardians cover Grant Road, Charni Road, Girgaon, and areas near Chowpatty beach. The seafront and quieter residential lanes provide excellent walking routes.",
      },
      {
        question: "Is Platypus available in Opera House and Girgaon?",
        answer: "We serve all of the Grant Road area including Opera House, Girgaon, and Charni Road. Our locally assigned Guardian knows the best walking spots in these historic neighbourhoods.",
      },
      {
        question: "What walking routes are best for dogs in Grant Road area?",
        answer: "Our Guardians use the Chowpatty promenade during early mornings, August Kranti Maidan for open space, and the quieter internal lanes of Girgaon for shaded walks. Routes are selected based on your dog's breed and energy level.",
      },
    ],
    reviews: [
      {
        author: "Farah Khan",
        rating: 5,
        text: "Living near Grant Road, we needed someone trustworthy for our two dogs. The Platypus Guardian handles both beautifully and the daily photo updates are wonderful.",
        date: "2025-02-15",
      },
      {
        author: "Sameer Iyer",
        rating: 5,
        text: "Our elderly Labrador needs gentle, patient walks. The Guardian assigned to us near Girgaon understands his pace perfectly. Highly recommend Platypus.",
        date: "2025-02-20",
      },
    ],
  },
  kurla: {
    name: "Kurla",
    displayName: "Kurla",
    slug: "kurla",
    description:
      "certified dog walking service in Kurla with professional pet care and GPS tracking",
    landmarks: ["Phoenix Market City", "Kurla Station", "BKC"],
    neighborhoods: ["Kurla West", "Kurla East", "Nehru Nagar", "Kamani"],
    coordinates: { lat: 19.0728, lng: 72.8826 },
    nearbyAreas: ["chembur", "dadar", "wadala", "andheri"],
    faq: [
      {
        question: "Do you provide dog walking near BKC and Phoenix Market City in Kurla?",
        answer: "Yes, our Guardians cover Kurla West, Kurla East, and areas near BKC. We use quieter residential lanes and garden spaces away from the busy commercial zones.",
      },
      {
        question: "Is the trial walk available in Kurla?",
        answer: "Yes, our ₹199 trial walk is available across Kurla including Nehru Nagar and Kamani. It's a great way to see how your dog responds to a certified Guardian.",
      },
    ],
    reviews: [
      {
        author: "Sunita Pawar",
        rating: 5,
        text: "We live near BKC and the Guardian makes sure our Indie gets proper exercise every day. The walk photos and GPS tracking give us complete visibility.",
        date: "2025-01-24",
      },
      {
        author: "Imran Shaikh",
        rating: 5,
        text: "Good service in Kurla at a reasonable price. Our dog is calmer and better behaved since starting regular walks with Platypus. Highly recommended.",
        date: "2025-02-12",
      },
    ],
  },
  chembur: {
    name: "Chembur",
    displayName: "Chembur",
    slug: "chembur",
    description:
      "professional dog walking service in Chembur with trained Guardians and live tracking",
    landmarks: ["RCF Garden", "Chembur Station", "Diamond Garden"],
    neighborhoods: ["Chembur", "Tilak Nagar", "RCF Colony", "Govandi"],
    coordinates: { lat: 19.0622, lng: 72.8992 },
    nearbyAreas: ["kurla", "wadala", "dadar"],
    faq: [
      {
        question: "Do you walk dogs in Diamond Garden and RCF Colony in Chembur?",
        answer: "Yes, Diamond Garden and RCF Colony are popular walking areas for our Guardians. These green, residential spaces provide safe and pleasant walking environments for dogs of all sizes.",
      },
      {
        question: "Is Platypus available in Tilak Nagar and Govandi?",
        answer: "We serve all of Chembur including Tilak Nagar, Govandi, and RCF Colony. Our locally assigned Guardian ensures timely, consistent service in your specific neighbourhood.",
      },
    ],
    reviews: [
      {
        author: "Rekha Menon",
        rating: 5,
        text: "Diamond Garden walks are perfect for our Labrador. The Chembur Guardian is always on time and our dog greets him like a best friend every morning.",
        date: "2025-01-27",
      },
      {
        author: "Aakash Gupta",
        rating: 5,
        text: "Reliable service in Chembur. The Guardian knows the best walking spots in RCF Colony and our dog gets a proper, structured walk every single day.",
        date: "2025-02-13",
      },
    ],
  },
};

// Helper function to get all location slugs (useful for routing)
export const getLocationSlugs = (): string[] => {
  return Object.keys(locations);
};

// Helper function to get location names in order (for UI display)
export const getLocationNames = (): string[] => {
  return Object.values(locations).map((loc) => loc.name);
};

// Helper function to get location by slug
export const getLocationBySlug = (slug: string): LocationData | undefined => {
  return locations[slug];
};
