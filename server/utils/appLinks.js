// utils/appLinks.js
//
// Centralised app-store URLs for the Platypus parent app, used in
// outbound emails and notifications.
//
// Reality (as of 2026-05-06):
//   - Android app is published on Play Store with id in.theplatypus.parent
//   - iOS app is not yet on the App Store. Default to empty so callers
//     can hide the iOS CTA. Set PLATYPUS_PARENT_APP_IOS_URL when iOS lands.
//   - link.theplatypus.in is the platypus-platform API host, not a
//     deep-link redirector. We don't surface a "universal link" until
//     a real branch.io / dynamic-link service is wired.
//
// Override via .env on the server.

export const PARENT_APP_ANDROID_URL =
    process.env.PLATYPUS_PARENT_APP_ANDROID_URL ||
    "https://play.google.com/store/apps/details?id=in.theplatypus.parent";

export const PARENT_APP_IOS_URL =
    process.env.PLATYPUS_PARENT_APP_IOS_URL || "";

// Optional badge images used in HTML emails. Leave empty to render
// text-only CTAs (default below) — keeps the email lightweight when
// brand badge URLs aren't yet hosted.
export const APP_STORE_BADGE_IMG =
    process.env.PLATYPUS_APP_STORE_BADGE_IMG || "";
export const PLAY_STORE_BADGE_IMG =
    process.env.PLATYPUS_PLAY_STORE_BADGE_IMG || "";
