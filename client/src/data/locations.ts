// Centralized location data for SEO and UI consistency
// This ensures AreasWeServe and LocationPage are always in sync

export interface LocationData {
  name: string;
  displayName: string;
  slug: string; // URL-friendly version for routing
  description: string;
  landmarks: string[];
  neighborhoods: string[];
  coordinates: { lat: number; lng: number };
  nearbyAreas: string[]; // Slugs of geographically nearby locations
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
