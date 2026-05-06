// utils/appLinks.js
//
// Centralised app-store URLs and badge image URLs for the Platypus parent
// app, used in outbound emails and notifications.
//
// Reality (as of 2026-05-06):
//   - Android app is published on Play Store (id: in.theplatypus.parent).
//   - iOS app is live but currently unlisted; Apple App Store page routes
//     to a request-access landing page at theplatypus.in/ios-access.
//   - Both badge images are served from official Apple/Google CDNs and
//     verified live. Set PLATYPUS_APP_STORE_BADGE_IMG /
//     PLATYPUS_PLAY_STORE_BADGE_IMG in .env to override (e.g. self-hosted
//     copies on theplatypus.in/badges/).
//
// Override any value via .env on the server.

export const PARENT_APP_IOS_URL =
    process.env.PLATYPUS_PARENT_APP_IOS_URL ||
    "https://www.theplatypus.in/ios-access";

export const PARENT_APP_ANDROID_URL =
    process.env.PLATYPUS_PARENT_APP_ANDROID_URL ||
    "https://play.google.com/store/apps/details?id=in.theplatypus.parent";

// Badge image URLs — official Apple and Google CDN assets.
// Apple: SVG, ~10.8 KB, renders at height="40" / Google: PNG, ~4.9 KB,
// renders at height="60" for visual parity (Google badge has more canvas
// padding, so the two different heights produce matched visual sizes).
export const APP_STORE_BADGE_IMG =
    process.env.PLATYPUS_APP_STORE_BADGE_IMG ||
    "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg";

export const PLAY_STORE_BADGE_IMG =
    process.env.PLATYPUS_PLAY_STORE_BADGE_IMG ||
    "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png";
