// Service x Location data structure for future programmatic SEO pages
// e.g., /services/dog-walking/bandra, /services/dog-grooming/andheri

import { getLocationSlugs, getLocationBySlug } from './locations';
import { getAllServiceSlugs, getServiceBySlug } from './services';

export interface ServiceLocationData {
  serviceSlug: string;
  locationSlug: string;
  serviceName: string;
  locationName: string;
  title: string;
  description: string;
}

/** Generate all service x location combinations */
export function getAllServiceLocationCombinations(): ServiceLocationData[] {
  const serviceSlugs = getAllServiceSlugs();
  const locationSlugs = getLocationSlugs();
  const combinations: ServiceLocationData[] = [];

  for (const serviceSlug of serviceSlugs) {
    const service = getServiceBySlug(serviceSlug);
    if (!service) continue;

    for (const locationSlug of locationSlugs) {
      const location = getLocationBySlug(locationSlug);
      if (!location) continue;

      combinations.push({
        serviceSlug,
        locationSlug,
        serviceName: service.name,
        locationName: location.name,
        title: `${service.name} in ${location.name} | Platypus`,
        description: `Professional ${service.name.toLowerCase()} service in ${location.displayName} with certified Guardians. ${service.tagline}.`,
      });
    }
  }

  return combinations;
}

/** Get service-location data for a specific combination */
export function getServiceLocation(
  serviceSlug: string,
  locationSlug: string
): ServiceLocationData | undefined {
  const service = getServiceBySlug(serviceSlug);
  const location = getLocationBySlug(locationSlug);
  if (!service || !location) return undefined;

  return {
    serviceSlug,
    locationSlug,
    serviceName: service.name,
    locationName: location.name,
    title: `${service.name} in ${location.name} | Platypus`,
    description: `Professional ${service.name.toLowerCase()} service in ${location.displayName} with certified Guardians. ${service.tagline}.`,
  };
}
