/**
 * Single source of truth for marketing numbers.
 *
 * Every hero counter, stats block, FAQ answer, and llms.txt reference should
 * pull from here — NOT hardcode a number. Numbers are honest, conservative,
 * and updatable in one place.
 *
 * If a different number is shown anywhere in the repo, that's the bug.
 */
export const marketingMetrics = {
  /** Confirmed walks completed across 2024-2026. Conservative: observed ~500+. */
  totalWalks: 500,
  /** Pet parents who've booked at least one walk. Conservative estimate. */
  happyParents: 100,
  /** Areas served in Mumbai — must match the number of entries in data/locations.ts. */
  areasServed: 16,
  /** Years Platypus has been running walks (founded 2024). */
  yearsRunning: 2,
  /** Number of certified Guardians currently active. */
  certifiedGuardians: 30,
  /** Aggregate Google review count from the business listing. */
  googleReviewCount: 34,
  /** Star rating from Google reviews. */
  googleRating: 4.9,
} as const;

export type MarketingMetrics = typeof marketingMetrics;
