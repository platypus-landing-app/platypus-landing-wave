/**
 * GA4 event tracking helpers.
 * GA is loaded in layout.tsx with measurement ID G-E00405X4KK.
 */

type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

function trackEvent({ action, category, label, value }: GTagEvent) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    ...(value !== undefined && { value }),
  });
}

// --- Conversion events ---

export function trackTrialBooking(location?: string) {
  trackEvent({
    action: 'trial_booking_submit',
    category: 'conversion',
    label: location || 'website',
  });
}

export function trackGuardianApplication(step?: string) {
  trackEvent({
    action: 'guardian_application_submit',
    category: 'conversion',
    label: step || 'complete',
  });
}

// --- Engagement events ---

export function trackWhatsAppClick(source: string) {
  trackEvent({
    action: 'whatsapp_click',
    category: 'engagement',
    label: source,
  });
}

export function trackPhoneClick(source: string) {
  trackEvent({
    action: 'phone_click',
    category: 'engagement',
    label: source,
  });
}

export function trackCTAClick(ctaName: string) {
  trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: ctaName,
  });
}

export function trackServiceNotificationSubscribe(service: string) {
  trackEvent({
    action: 'notification_subscribe',
    category: 'conversion',
    label: service,
  });
}

export function trackBlogRead(slug: string) {
  trackEvent({
    action: 'blog_read',
    category: 'content',
    label: slug,
  });
}
