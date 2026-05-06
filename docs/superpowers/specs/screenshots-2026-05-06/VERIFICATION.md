# Browser Verification — 2026-05-06

Smoke test against `next dev` on `:3000` (no local backend running). Playwright MCP driven.

## Verified locally

- ✅ Trial booking dialog opens from hero CTA.
- ✅ **Step 1** renders all required fields: full name, mobile + WhatsApp checkbox, email (optional), and the new structured address block (search autocomplete, flat / building, landmark, city dropdown defaulting to Mumbai, pincode).
- ✅ Progress bar shows "Step 1 of 3 · 33% complete".
- ✅ "Next" button is correctly disabled until phone is verified (CTA gated on `phoneVerified` state, as designed).
- ✅ Mobile viewport (390×844): modal scrollable, fields stack cleanly, footer Back/Next stays anchored.
- ✅ Build clean (`bun run build`) and type-check clean (`bunx tsc --noEmit`) across all 13 implementation tasks. The 3 pre-existing type errors in `CallToAction.tsx`, `Testimonials.tsx`, `ServicesShowcase.tsx` are unrelated to this work.

## Deferred to staging verification (Task 16)

These require the Express backend running with MongoDB / Firebase Admin / Brevo / Telegram credentials, which the local dev environment does not have provisioned:

- Firebase OTP send + verify flow (Step 1 → 2 transition).
- Submit of full booking → backend `/api/bookings/save-send-booking-email` → `dog_bookings` insert with `leadTemperature` derivation.
- `EnrichmentScreen` PATCH to `/api/leads/:id/enrichment` → enrichment payload persisted.
- WhatsApp-stub Telegram notification dispatch.
- Pincode index + leadTemperature index visible via `db.dog_bookings.getIndexes()`.

Plan: push to staging on the existing CI deploy script (`redeploy-platypus-walk-landing.sh` via SSH on push), then run the same Playwright MCP checklist against `https://theplatypus.in/` with a real test phone number. Mongo verification via `mongosh` on `quantalynk-new`.

## Screenshots

- `step-1-desktop.png` — desktop viewport, dialog Step 1.
- `step-1-mobile.png` — 390×844 mobile viewport, dialog Step 1.
