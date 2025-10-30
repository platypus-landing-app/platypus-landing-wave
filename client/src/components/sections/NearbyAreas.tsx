'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";
import { locations } from "@/data/locations";

interface NearbyAreasProps {
  currentLocation: string;
  nearbyLocations: string[];
}

export function NearbyAreas({ currentLocation, nearbyLocations }: NearbyAreasProps) {
  const currentLocationInfo = locations[currentLocation];
  const router = useRouter();

  const handleViewAllAreas = () => {
    router.push("/#areas");
    setTimeout(() => {
      const element = document.querySelector("#areas");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dog Walking Services in Nearby Areas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We also serve dog owners in areas near {currentLocationInfo.name}.
            Check out our professional dog walking services in these locations:
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {nearbyLocations.map((locationSlug) => {
            const location = locations[locationSlug];
            if (!location) return null;

            return (
              <Link
                key={locationSlug}
                href={`/dog-walking/${locationSlug}`}
                className="group bg-white rounded-lg p-4 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 cursor-pointer block"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {location.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      Professional dog walking in {location.displayName}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleViewAllAreas}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
          >
            View All Service Areas
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
