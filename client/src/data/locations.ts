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
  bandra: {
    name: "Bandra",
    displayName: "Bandra West & East",
    slug: "bandra",
    description:
      "professional dog walking service in Bandra with certified Guardians covering Bandra West, Bandra East, and surrounding areas",
    landmarks: ["Carter Road", "Bandstand", "Linking Road", "Hill Road"],
    neighborhoods: ["Bandra West", "Bandra East", "Pali Hill", "Khar"],
    coordinates: { lat: 19.0596, lng: 72.8295 },
    nearbyAreas: ["khar", "santacruz", "mahim", "worli", "andheri", "juhu"],
    faq: [
      {
        question: "Do you provide dog walking near Carter Road and Bandstand in Bandra?",
        answer: "Yes, our certified Guardians walk dogs daily along Carter Road, Bandstand, and other popular Bandra routes. These areas are ideal for structured walks with sea breeze and ample space.",
      },
      {
        question: "What time slots are available for dog walking in Bandra?",
        answer: "We offer morning (6 AM–10 AM) and evening (4 PM–8 PM) slots in Bandra West and East. You can choose a fixed slot that works best for your dog's routine.",
      },
      {
        question: "Is Platypus available in Pali Hill and Bandra East?",
        answer: "Absolutely. Our Guardians cover all of Bandra including Pali Hill, Bandra East, Hill Road, and Linking Road areas. We assign a Guardian who lives nearby for consistency.",
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
  andheri: {
    name: "Andheri",
    displayName: "Andheri West & East",
    slug: "andheri",
    description:
      "certified dog walking service in Andheri covering Andheri West, Andheri East, and nearby localities",
    landmarks: ["Lokhandwala", "Versova", "Oshiwara", "Jogeshwari"],
    neighborhoods: ["Andheri West", "Andheri East", "Versova", "Oshiwara"],
    coordinates: { lat: 19.1136, lng: 72.8697 },
    nearbyAreas: ["versova", "juhu", "vile-parle", "santacruz", "goregaon", "malad"],
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
  powai: {
    name: "Powai",
    displayName: "Powai",
    slug: "powai",
    description:
      "professional dog walking service in Powai with trained Guardians for Powai Lake area and surrounding neighborhoods",
    landmarks: ["Powai Lake", "Hiranandani Gardens", "IIT Bombay Area"],
    neighborhoods: ["Hiranandani", "Powai Lake Area", "Chandivali"],
    coordinates: { lat: 19.1176, lng: 72.9060 },
    nearbyAreas: ["ghatkopar", "kurla", "mulund", "chembur", "thane"],
    faq: [
      {
        question: "Are walks available near Powai Lake and Hiranandani Gardens?",
        answer: "Yes, Powai Lake promenade and Hiranandani Gardens are among our most popular walking routes. Our Guardians know the best paths around the lake for safe, enriching walks.",
      },
      {
        question: "Do you serve Chandivali and areas near IIT Bombay?",
        answer: "We cover all of Powai including Chandivali, Nahar, and areas near IIT Bombay campus. A locally assigned Guardian ensures timely service every day.",
      },
      {
        question: "What safety measures do you follow near Powai Lake?",
        answer: "Our Guardians follow strict leashing protocols near water bodies. Dogs are kept on short leashes near the lake edge, and we avoid areas with known wildlife activity. Every walk includes real-time GPS tracking.",
      },
    ],
    reviews: [
      {
        author: "Tanusri Maitra",
        rating: 5,
        text: "So far, I am very happy with the service. Regular, Punctual, Proper handling of the child, and the other best practices are picking up poop. I am so happy with the kind of walk my little one is getting.",
        date: "2025-01-10",
      },
      {
        author: "Vikram Joshi",
        rating: 5,
        text: "We live in Hiranandani and the lake walks are perfect for our Golden Retriever. The Guardian sends us photos from every walk. Excellent service!",
        date: "2025-01-25",
      },
    ],
  },
  worli: {
    name: "Worli",
    displayName: "Worli",
    slug: "worli",
    description:
      "certified dog walking service in Worli with GPS tracking and trained Guardians",
    landmarks: ["Worli Sea Face", "Nehru Planetarium", "Phoenix Mills"],
    neighborhoods: ["Worli", "Lower Parel", "Prabhadevi"],
    coordinates: { lat: 19.0176, lng: 72.8125 },
    nearbyAreas: ["lower-parel", "bandra", "dadar", "matunga", "byculla", "colaba"],
    faq: [
      {
        question: "Do your Guardians walk dogs along Worli Sea Face?",
        answer: "Yes, Worli Sea Face is one of our most popular walking routes. Our Guardians take dogs along the promenade during cooler morning and evening hours for a refreshing walk with sea views.",
      },
      {
        question: "Is Platypus available in Prabhadevi and near Siddhivinayak?",
        answer: "We serve all of Worli including Prabhadevi, Worli Naka, and areas near Siddhivinayak Temple. Our Guardians select quiet, shaded routes for safe and comfortable walks.",
      },
    ],
    reviews: [
      {
        author: "Meera Bhatia",
        rating: 5,
        text: "The Worli Sea Face walks are the highlight of our Beagle's day. The Guardian is incredibly patient and our dog runs to greet him every morning!",
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
  juhu: {
    name: "Juhu",
    displayName: "Juhu",
    slug: "juhu",
    description:
      "professional dog walking service in Juhu Beach area with certified pet care Guardians",
    landmarks: ["Juhu Beach", "ISKCON Temple", "Juhu Chowpatty"],
    neighborhoods: ["Juhu", "Vile Parle", "Santacruz"],
    coordinates: { lat: 19.0990, lng: 72.8265 },
    nearbyAreas: ["bandra", "versova", "santacruz", "andheri", "vile-parle", "khar"],
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
  thane: {
    name: "Thane",
    displayName: "Thane",
    slug: "thane",
    description:
      "certified dog walking service in Thane with professional Guardians and live GPS tracking",
    landmarks: ["Upvan Lake", "Viviana Mall", "Yeoor Hills"],
    neighborhoods: ["Ghodbunder Road", "Majiwada", "Kasarvadavali"],
    coordinates: { lat: 19.2183, lng: 72.9781 },
    nearbyAreas: ["mulund", "ghatkopar", "powai", "navi-mumbai"],
    faq: [
      {
        question: "Do you provide dog walking near Upvan Lake and Yeoor Hills in Thane?",
        answer: "Yes, Upvan Lake and Yeoor Hills surroundings are excellent walking routes. Our Guardians use these green spaces for enriching walks while maintaining safety protocols in nature areas.",
      },
      {
        question: "Is Platypus available along Ghodbunder Road in Thane?",
        answer: "We serve Ghodbunder Road, Majiwada, Kasarvadavali, and surrounding Thane localities. We assign a local Guardian who knows the best walking spots in your specific area.",
      },
    ],
    reviews: [
      {
        author: "Siddhi Nair",
        rating: 5,
        text: "Finding a professional dog walker in Thane was difficult until Platypus expanded here. The Guardian is well-trained and our Husky loves the Upvan Lake route.",
        date: "2025-01-18",
      },
      {
        author: "Amey Deshpande",
        rating: 5,
        text: "The service quality in Thane is on par with what friends get in Bandra. GPS tracking, timely walks, and photo updates — everything is professional.",
        date: "2025-02-08",
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
    neighborhoods: ["Lower Parel", "Worli", "Prabhadevi"],
    coordinates: { lat: 19.0008, lng: 72.8300 },
    nearbyAreas: ["worli", "dadar", "byculla", "matunga", "colaba"],
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
  colaba: {
    name: "Colaba",
    displayName: "Colaba",
    slug: "colaba",
    description:
      "certified dog walking service in Colaba and South Mumbai with professional pet care",
    landmarks: ["Gateway of India", "Colaba Causeway", "Regal Cinema"],
    neighborhoods: ["Colaba", "Cuffe Parade", "Navy Nagar"],
    coordinates: { lat: 18.9220, lng: 72.8347 },
    nearbyAreas: ["worli", "lower-parel", "byculla"],
    faq: [
      {
        question: "Do you serve Cuffe Parade and Navy Nagar in South Mumbai?",
        answer: "Yes, our Guardians cover all of Colaba including Cuffe Parade, Navy Nagar, and areas near Colaba Causeway. South Mumbai's tree-lined streets and seafront make excellent walking routes.",
      },
      {
        question: "Are there specific walking routes in Colaba for larger breeds?",
        answer: "Our Guardians select routes with ample space for larger breeds, including the Colaba seafront promenade and quieter garden areas. Walk intensity is matched to your dog's breed and energy level.",
      },
    ],
    reviews: [
      {
        author: "Farah Khan",
        rating: 5,
        text: "Living in Cuffe Parade, we needed someone trustworthy for our two dogs. The Platypus Guardian handles both beautifully and the daily photo updates are wonderful.",
        date: "2025-01-22",
      },
      {
        author: "Sameer Iyer",
        rating: 5,
        text: "Our elderly Labrador needs gentle, patient walks. The Guardian assigned to us in Colaba understands his pace perfectly. Highly recommend Platypus.",
        date: "2025-02-03",
      },
    ],
  },
  versova: {
    name: "Versova",
    displayName: "Versova",
    slug: "versova",
    description:
      "professional dog walking service in Versova with certified Guardians near Versova Beach",
    landmarks: ["Versova Beach", "Versova Fort", "Seven Bungalows"],
    neighborhoods: ["Versova", "Seven Bungalows", "Yari Road", "D.N. Nagar"],
    coordinates: { lat: 19.1318, lng: 72.8131 },
    nearbyAreas: ["andheri", "juhu", "goregaon", "malad"],
    faq: [
      {
        question: "Do Guardians walk dogs near Versova Beach?",
        answer: "Yes, our Guardians use the Versova Beach area and nearby lanes for walks, especially during early morning when the beach is quiet. Dogs are kept on secure leashes near the water.",
      },
      {
        question: "Is Platypus available in Seven Bungalows and Yari Road?",
        answer: "We cover all of Versova including Seven Bungalows, Yari Road, D.N. Nagar, and the Versova Fort area. A local Guardian ensures consistent, timely service.",
      },
    ],
    reviews: [
      {
        author: "Isha Gupta",
        rating: 5,
        text: "Our Cocker Spaniel loves the beach walks in Versova. The Guardian is always on time and the GPS tracking shows exactly where they go. Very professional service.",
        date: "2025-01-14",
      },
      {
        author: "Nikhil Shetty",
        rating: 5,
        text: "Best dog walking service in Versova, hands down. The Guardian genuinely cares about our dog and we get detailed walk reports every day.",
        date: "2025-02-06",
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
    nearbyAreas: ["andheri", "goregaon", "kandivali", "borivali", "versova"],
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
  borivali: {
    name: "Borivali",
    displayName: "Borivali West & East",
    slug: "borivali",
    description:
      "professional dog walking service in Borivali with trained Guardians near Sanjay Gandhi National Park",
    landmarks: ["Sanjay Gandhi National Park", "Gorai Beach", "EsselWorld"],
    neighborhoods: ["Borivali West", "Borivali East", "IC Colony", "Shimpoli"],
    coordinates: { lat: 19.2305, lng: 72.8567 },
    nearbyAreas: ["kandivali", "malad", "goregaon"],
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
    nearbyAreas: ["borivali", "malad", "goregaon", "andheri"],
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
  santacruz: {
    name: "Santacruz",
    displayName: "Santacruz West & East",
    slug: "santacruz",
    description:
      "professional dog walking service in Santacruz with certified pet care Guardians",
    landmarks: ["Santacruz Station", "Vakola Market", "VN Road"],
    neighborhoods: ["Santacruz West", "Santacruz East", "Vakola", "Kalina"],
    coordinates: { lat: 19.0896, lng: 72.8423 },
    nearbyAreas: ["bandra", "khar", "vile-parle", "andheri", "juhu", "kurla"],
    faq: [
      {
        question: "Do you serve Vakola and Kalina areas in Santacruz?",
        answer: "Yes, we cover Santacruz West, Santacruz East, Vakola, and Kalina. Our Guardians know the local lanes and garden spots ideal for comfortable walks.",
      },
      {
        question: "Can I switch between morning and evening slots in Santacruz?",
        answer: "Yes, we offer flexible scheduling. You can choose morning (6–10 AM) or evening (4–8 PM) slots and switch between them with advance notice to your Guardian.",
      },
    ],
    reviews: [
      {
        author: "Ritika Agarwal",
        rating: 5,
        text: "We live in Santacruz West and our Guardian is wonderful. Our Dachshund needs short, gentle walks and the Guardian adjusts perfectly to his pace.",
        date: "2025-01-11",
      },
      {
        author: "Dev Kulkarni",
        rating: 5,
        text: "Reliable dog walking in Santacruz is hard to find. Platypus solved that — GPS tracking, daily photos, and a Guardian our dog trusts completely.",
        date: "2025-01-30",
      },
    ],
  },
  khar: {
    name: "Khar",
    displayName: "Khar West & East",
    slug: "khar",
    description:
      "certified dog walking service in Khar with professional Guardians near Khar Danda",
    landmarks: ["Khar Danda", "Khar Station", "Linking Road"],
    neighborhoods: ["Khar West", "Khar East", "Khar Danda", "St. Teresa"],
    coordinates: { lat: 19.0703, lng: 72.8397 },
    nearbyAreas: ["bandra", "santacruz", "juhu", "andheri", "vile-parle"],
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
  byculla: {
    name: "Byculla",
    displayName: "Byculla",
    slug: "byculla",
    description:
      "professional dog walking service in Byculla with trained certified Guardians",
    landmarks: ["Byculla Zoo", "Gloria Church", "Jijamata Udyaan"],
    neighborhoods: ["Byculla", "Mazgaon", "Mandvi", "Clare Road"],
    coordinates: { lat: 18.9793, lng: 72.8326 },
    nearbyAreas: ["dadar", "lower-parel", "worli", "matunga", "colaba"],
    faq: [
      {
        question: "Are walks available near Byculla Zoo and Jijamata Udyaan?",
        answer: "Our Guardians walk dogs in the residential areas around Byculla Zoo and Jijamata Udyaan. The garden paths near the zoo provide shaded, comfortable walking routes.",
      },
      {
        question: "Do you cover Mazgaon and Mandvi in Byculla?",
        answer: "Yes, we serve all of Byculla including Mazgaon, Mandvi, Clare Road, and areas near Gloria Church. We select quiet routes suitable for dogs in these historic neighbourhoods.",
      },
    ],
    reviews: [
      {
        author: "Zara Sheikh",
        rating: 5,
        text: "Professional service in Byculla at last! Our Guardian walks our rescue dog near the zoo gardens every morning. The walk reports are detailed and helpful.",
        date: "2025-01-17",
      },
      {
        author: "Ashwin Naik",
        rating: 5,
        text: "We have two rescue dogs and the Guardian handles both with confidence. The Byculla garden walks are perfect for them. GPS tracking is reliable.",
        date: "2025-02-01",
      },
    ],
  },
  dadar: {
    name: "Dadar",
    displayName: "Dadar West & East",
    slug: "dadar",
    description:
      "certified dog walking service in Dadar covering Dadar West and Dadar East with GPS tracking",
    landmarks: ["Shivaji Park", "Dadar Flower Market", "Siddhivinayak Temple"],
    neighborhoods: ["Dadar West", "Dadar East", "Shivaji Park", "Hindmata"],
    coordinates: { lat: 19.0176, lng: 72.8464 },
    nearbyAreas: ["matunga", "worli", "lower-parel", "byculla", "kurla"],
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
  matunga: {
    name: "Matunga",
    displayName: "Matunga",
    slug: "matunga",
    description:
      "professional dog walking service in Matunga with certified Guardians and safety protocols",
    landmarks: ["Ruia College", "Kings Circle", "Matunga Station"],
    neighborhoods: ["Matunga", "Kings Circle", "Sion", "Mahim"],
    coordinates: { lat: 19.0266, lng: 72.8492 },
    nearbyAreas: ["dadar", "worli", "lower-parel", "kurla", "byculla"],
    faq: [
      {
        question: "Do you walk dogs near Kings Circle and Ruia College in Matunga?",
        answer: "Yes, the Kings Circle gardens and residential lanes near Ruia College are regular walking routes for our Guardians. These areas offer tree-lined paths perfect for comfortable walks.",
      },
      {
        question: "Is Platypus available in Sion and Mahim near Matunga?",
        answer: "We cover Matunga, Sion, Mahim, and Kings Circle. If your exact area is on the boundary, contact us and we'll confirm Guardian availability in your locality.",
      },
    ],
    reviews: [
      {
        author: "Kavitha Reddy",
        rating: 5,
        text: "The quiet streets of Matunga are perfect for our senior dog. The Guardian walks him at a gentle pace and sends us health notes after every walk.",
        date: "2025-01-23",
      },
      {
        author: "Girish Pandit",
        rating: 5,
        text: "Kings Circle walks have become our Lab's favourite part of the day. The Guardian is experienced and we trust Platypus completely with our dog.",
        date: "2025-02-11",
      },
    ],
  },
  kurla: {
    name: "Kurla",
    displayName: "Kurla West & East",
    slug: "kurla",
    description:
      "certified dog walking service in Kurla with professional pet care and GPS tracking",
    landmarks: ["Phoenix Market City", "Kurla Station", "BKC"],
    neighborhoods: ["Kurla West", "Kurla East", "Nehru Nagar", "Kamani"],
    coordinates: { lat: 19.0728, lng: 72.8826 },
    nearbyAreas: ["ghatkopar", "chembur", "powai", "santacruz", "dadar", "matunga"],
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
    nearbyAreas: ["kurla", "ghatkopar", "powai", "mulund", "navi-mumbai"],
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
  ghatkopar: {
    name: "Ghatkopar",
    displayName: "Ghatkopar West & East",
    slug: "ghatkopar",
    description:
      "certified dog walking service in Ghatkopar covering both West and East areas",
    landmarks: ["R City Mall", "Ghatkopar Station", "Rajawadi Hospital"],
    neighborhoods: ["Ghatkopar West", "Ghatkopar East", "Asalpha", "Pant Nagar"],
    coordinates: { lat: 19.0864, lng: 72.9081 },
    nearbyAreas: ["kurla", "chembur", "powai", "mulund", "thane"],
    faq: [
      {
        question: "Do you cover Pant Nagar and Asalpha in Ghatkopar?",
        answer: "Yes, our Guardians serve Ghatkopar West, Ghatkopar East, Pant Nagar, and Asalpha. We know the best walking lanes and garden spots in each neighbourhood.",
      },
      {
        question: "How do you handle monsoon walks in Ghatkopar?",
        answer: "During monsoon, our Guardians use covered walking paths and residential society compounds in Ghatkopar. Walk duration may be adjusted, but we ensure your dog gets daily exercise rain or shine.",
      },
    ],
    reviews: [
      {
        author: "Shruti Patil",
        rating: 5,
        text: "Our Pug needs short walks and the Guardian in Ghatkopar understands this perfectly. No overexertion, just the right amount of exercise. Very thoughtful service.",
        date: "2025-01-29",
      },
      {
        author: "Raj Verma",
        rating: 5,
        text: "We were skeptical about professional dog walking in Ghatkopar but the trial walk changed our mind. The GPS tracking shows exactly where they go. Excellent.",
        date: "2025-02-14",
      },
    ],
  },
  mulund: {
    name: "Mulund",
    displayName: "Mulund West & East",
    slug: "mulund",
    description:
      "professional dog walking service in Mulund with certified Guardians near green zones",
    landmarks: ["Johnson & Johnson Gardens", "Mulund Station", "Fortis Hospital"],
    neighborhoods: ["Mulund West", "Mulund East", "Nahur", "Bhandup"],
    coordinates: { lat: 19.1722, lng: 72.9565 },
    nearbyAreas: ["thane", "ghatkopar", "powai", "chembur"],
    faq: [
      {
        question: "Are walks available near Johnson & Johnson Gardens in Mulund?",
        answer: "Yes, Johnson & Johnson Gardens is one of our favourite walking spots in Mulund. The green, well-maintained paths are ideal for dogs of all sizes and energy levels.",
      },
      {
        question: "Do you serve Nahur and Bhandup near Mulund?",
        answer: "We cover Mulund West, Mulund East, Nahur, and Bhandup. Our Guardians are locally assigned and familiar with the best walking routes in your specific area.",
      },
    ],
    reviews: [
      {
        author: "Anita Sharma",
        rating: 5,
        text: "The Johnson & Johnson Gardens walks are amazing for our Golden Retriever. Mulund's green spaces are well utilized by the Guardian. Couldn't be happier.",
        date: "2025-01-31",
      },
      {
        author: "Vishal Patil",
        rating: 5,
        text: "Our dogs in Mulund get consistent, quality walks every day. The Guardian is always on time and the walk tracking gives us full transparency.",
        date: "2025-02-15",
      },
    ],
  },
  "navi-mumbai": {
    name: "Navi Mumbai",
    displayName: "Navi Mumbai",
    slug: "navi-mumbai",
    description:
      "certified dog walking service in Navi Mumbai with professional pet care across sectors",
    landmarks: ["Seawoods", "Vashi", "Kharghar", "Palm Beach Road"],
    neighborhoods: ["Vashi", "Nerul", "Kharghar", "CBD Belapur"],
    coordinates: { lat: 19.0330, lng: 73.0297 },
    nearbyAreas: ["thane", "chembur", "ghatkopar"],
    faq: [
      {
        question: "Which sectors in Navi Mumbai does Platypus serve?",
        answer: "We serve Vashi, Nerul, Kharghar, CBD Belapur, and Seawoods. Navi Mumbai's planned layouts and wide footpaths make it excellent for structured dog walks.",
      },
      {
        question: "Can I walk my dog along Palm Beach Road with Platypus?",
        answer: "Yes, Palm Beach Road's promenade is a popular walking route for our Guardians. The wide, scenic pathway is ideal for longer walks with larger breeds.",
      },
    ],
    reviews: [
      {
        author: "Snehal Desai",
        rating: 5,
        text: "Navi Mumbai finally has a professional dog walking service! Our Guardian in Kharghar is fantastic. The sector's wide lanes are perfect for our Dalmatian's walks.",
        date: "2025-01-20",
      },
      {
        author: "Prasad Kulkarni",
        rating: 5,
        text: "Palm Beach Road walks are our Lab's highlight. The Guardian uses the full promenade and sends us great photos. Platypus delivers real quality in Navi Mumbai.",
        date: "2025-02-10",
      },
    ],
  },
  "vile-parle": {
    name: "Vile Parle",
    displayName: "Vile Parle West & East",
    slug: "vile-parle",
    description:
      "professional dog walking service in Vile Parle with certified Guardians near Parle area",
    landmarks: ["Parle Point", "Vile Parle Station", "Mumbai Airport"],
    neighborhoods: ["Vile Parle West", "Vile Parle East", "JVPD", "Irla"],
    coordinates: { lat: 19.1076, lng: 72.8263 },
    nearbyAreas: ["andheri", "santacruz", "juhu", "khar", "bandra"],
    faq: [
      {
        question: "Do you walk dogs in JVPD and Irla in Vile Parle?",
        answer: "Yes, JVPD Scheme and Irla are well-served areas. Our Guardians use the quiet residential lanes and garden compounds in these localities for safe, comfortable walks.",
      },
      {
        question: "How do you handle airport noise for dogs in Vile Parle?",
        answer: "Our Guardians select routes away from flight paths and noisy areas. We know which lanes in Vile Parle provide quieter walking environments, especially for dogs sensitive to loud sounds.",
      },
    ],
    reviews: [
      {
        author: "Tanya Kapoor",
        rating: 5,
        text: "JVPD lanes are peaceful for dog walks and our Guardian knows them all. The service is consistent and our Spitz loves her daily outings with Platypus.",
        date: "2025-01-06",
      },
      {
        author: "Hemant Desai",
        rating: 5,
        text: "Living near the airport, we needed a walker who knows the quiet spots. The Platypus Guardian in Vile Parle gets it right. Our anxious rescue dog is much calmer now.",
        date: "2025-02-08",
      },
    ],
  },
  goregaon: {
    name: "Goregaon",
    displayName: "Goregaon West & East",
    slug: "goregaon",
    description:
      "certified dog walking service in Goregaon with GPS tracking and professional Guardians",
    landmarks: ["Film City", "Aarey Colony", "Goregaon Station", "Oberoi Mall"],
    neighborhoods: ["Goregaon West", "Goregaon East", "Aarey Colony", "Motilal Nagar"],
    coordinates: { lat: 19.1656, lng: 72.8498 },
    nearbyAreas: ["andheri", "malad", "kandivali", "borivali", "versova"],
    faq: [
      {
        question: "Can my dog walk near Aarey Colony with Platypus?",
        answer: "Our Guardians use walking routes near Aarey Colony's green fringes and residential areas in Goregaon. The natural surroundings provide enriching walks for dogs who enjoy nature.",
      },
      {
        question: "Do you cover Goregaon East and Film City area?",
        answer: "Yes, we serve Goregaon West, Goregaon East, Motilal Nagar, and areas near Film City. Our locally assigned Guardian ensures consistent, timely walks every day.",
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
