// utils/appLinks.js
//
// Centralised app-store URLs for the Platypus parent app, used in
// outbound emails and notifications.
//
// Override via env in .env on the staging server when the apps are
// listed on the actual stores. The defaults below assume:
//   - iOS App Store ID is not yet known (placeholder; replace with real id)
//   - Android Play Store uses the live applicationId from
//     apps/parent-app/android/app/build.gradle.kts
//   - Universal link domain is link.theplatypus.in (already configured
//     for deep links per the platform CLAUDE.md)

export const PARENT_APP_IOS_URL =
    process.env.PLATYPUS_PARENT_APP_IOS_URL ||
    "https://link.theplatypus.in/ios";

export const PARENT_APP_ANDROID_URL =
    process.env.PLATYPUS_PARENT_APP_ANDROID_URL ||
    "https://play.google.com/store/apps/details?id=in.theplatypus.parent";

export const PARENT_APP_UNIVERSAL_URL =
    process.env.PLATYPUS_PARENT_APP_UNIVERSAL_URL ||
    "https://link.theplatypus.in/parent";

// Optional badge images used in HTML emails. Leave empty to render
// text-only CTAs (default below) — keeps the email lightweight when
// brand badge URLs aren't yet hosted.
export const APP_STORE_BADGE_IMG =
    process.env.PLATYPUS_APP_STORE_BADGE_IMG || "";
export const PLAY_STORE_BADGE_IMG =
    process.env.PLATYPUS_PLAY_STORE_BADGE_IMG || "";
