/**
 * Derives lead temperature from preferred start date and current situation.
 *
 * Hot   → preferredDate within 3 days
 * Warm  → preferredDate within 14 days
 * Cold  → currentSituation === "exploring" OR farther out
 */
export function deriveLeadTemperature({ preferredDate, currentSituation }) {
    if (currentSituation === "exploring") return "cold";
    if (!preferredDate) return "warm";
    const target = new Date(preferredDate);
    if (Number.isNaN(target.getTime())) return "warm";
    const days = Math.ceil((target.getTime() - Date.now()) / 86400000);
    if (days <= 3) return "hot";
    if (days <= 14) return "warm";
    return "cold";
}
