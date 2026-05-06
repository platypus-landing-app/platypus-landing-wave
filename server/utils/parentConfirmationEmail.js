// utils/parentConfirmationEmail.js
//
// Sends a rich confirmation email to the pet parent immediately after
// the inquiry form is submitted. Replaces what would normally be a
// WhatsApp / SMS auto-reply until those channels are wired up.
//
// Email content:
//   - Personal confirmation with first name + lead temperature in subject
//   - "What happens next" — sets expectation that ops will call/WhatsApp within 30 min
//   - Booking summary (date, time slots, area) so parent can verify
//   - Parent app CTAs (iOS + Android) — track walks today, book in-app soon
//   - Direct contact (phone) for urgent questions
//
// Hard rules enforced in copy:
//   - No em-dashes / en-dashes
//   - No AI-tell phrases (delve, tapestry, seamless, robust, etc.)
//   - First-person plural ("we") matching the existing site voice
import SibApiV3Sdk from "sib-api-v3-sdk";
import {
    PARENT_APP_IOS_URL,
    PARENT_APP_ANDROID_URL,
    PARENT_APP_UNIVERSAL_URL,
    APP_STORE_BADGE_IMG,
    PLAY_STORE_BADGE_IMG,
} from "./appLinks.js";

const SUPPORT_PHONE = "+91 84518 80963";
const SUPPORT_EMAIL = "support@theplatypus.in";

function escapeHtml(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[c]);
}

function renderAppCTA() {
    if (APP_STORE_BADGE_IMG && PLAY_STORE_BADGE_IMG) {
        return `
      <a href="${PARENT_APP_IOS_URL}" style="display:inline-block; margin-right:8px; text-decoration:none;">
        <img src="${APP_STORE_BADGE_IMG}" alt="Download on the App Store" style="height:44px; width:auto; border:0;" />
      </a>
      <a href="${PARENT_APP_ANDROID_URL}" style="display:inline-block; text-decoration:none;">
        <img src="${PLAY_STORE_BADGE_IMG}" alt="Get it on Google Play" style="height:44px; width:auto; border:0;" />
      </a>
    `;
    }
    return `
      <a href="${PARENT_APP_IOS_URL}" style="display:inline-block; margin-right:10px; padding:10px 16px; background:#000; color:#fff; text-decoration:none; border-radius:6px; font-size:14px; font-weight:600;">
        Download for iPhone
      </a>
      <a href="${PARENT_APP_ANDROID_URL}" style="display:inline-block; padding:10px 16px; background:#247AFD; color:#fff; text-decoration:none; border-radius:6px; font-size:14px; font-weight:600;">
        Download for Android
      </a>
    `;
}

function buildHtml({ booking }) {
    const firstName = (booking.fullName || "").split(" ")[0] || "there";
    const addr = booking.address || {};
    const areaLine = [addr.area, addr.city].filter(Boolean).join(", ") || addr.city || "your area";
    const slots = Array.isArray(booking.timeSlots) && booking.timeSlots.length
        ? booking.timeSlots.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(", ")
        : (booking.timeSlot || "your preferred slot");
    const dateStr = booking.preferredDate
        ? new Date(booking.preferredDate).toLocaleDateString("en-IN", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
        })
        : "your selected date";
    const dogsLine = Array.isArray(booking.dogs) && booking.dogs.length
        ? booking.dogs.map((d) => d.name).filter(Boolean).join(", ") || "your pup"
        : "your pup";

    return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color:#1f2937; max-width:600px; margin:auto; background:#ffffff;">
    <div style="padding:24px 24px 8px; border-bottom:2px solid #f0c14b;">
      <h1 style="margin:0; font-size:22px; color:#1f2937;">Hey ${escapeHtml(firstName)}, we&apos;ve got your request 🐾</h1>
    </div>

    <div style="padding:20px 24px;">
      <p style="font-size:15px; line-height:1.55; margin:0 0 14px;">
        Thanks for choosing Platypus for ${escapeHtml(dogsLine)}. Here&apos;s what happens next.
      </p>

      <div style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:14px 16px; margin:14px 0;">
        <p style="margin:0 0 8px; font-weight:600; color:#1f2937;">What happens next</p>
        <ol style="margin:0; padding-left:20px; line-height:1.6; font-size:14px;">
          <li>Our team is checking Guardian availability in ${escapeHtml(areaLine)}.</li>
          <li>We&apos;ll call or WhatsApp you within 30 minutes to confirm your slot.</li>
          <li>Once confirmed, you&apos;ll receive Guardian details and a quick safety walkthrough.</li>
        </ol>
      </div>

      <div style="background:#fffbea; border:1px solid #fde68a; border-radius:8px; padding:14px 16px; margin:14px 0;">
        <p style="margin:0 0 8px; font-weight:600; color:#1f2937;">Your request</p>
        <p style="margin:4px 0; font-size:14px;"><strong>Start date:</strong> ${escapeHtml(dateStr)}</p>
        <p style="margin:4px 0; font-size:14px;"><strong>Time slots:</strong> ${escapeHtml(slots)}</p>
        <p style="margin:4px 0; font-size:14px;"><strong>Area:</strong> ${escapeHtml(areaLine)}${addr.pincode ? " - " + escapeHtml(addr.pincode) : ""}</p>
        <p style="margin:4px 0; font-size:14px;"><strong>Mobile:</strong> ${escapeHtml(booking.mobile || "")}</p>
      </div>

      <div style="margin:22px 0 6px; padding-top:18px; border-top:1px solid #e5e7eb;">
        <p style="margin:0 0 6px; font-weight:600; color:#1f2937;">📱 Track your walks on the Platypus app</p>
        <p style="margin:0 0 12px; font-size:14px; line-height:1.55; color:#4b5563;">
          Once your walks start, follow them live on our parent app. Booking through the app rolls out shortly; for now we&apos;ll continue handling new bookings on call or WhatsApp.
        </p>
        ${renderAppCTA()}
        <p style="margin:10px 0 0; font-size:12px; color:#6b7280;">
          One link for both stores: <a href="${PARENT_APP_UNIVERSAL_URL}" style="color:#247AFD;">${PARENT_APP_UNIVERSAL_URL}</a>
        </p>
      </div>

      <div style="margin:20px 0 4px; padding-top:18px; border-top:1px solid #e5e7eb;">
        <p style="margin:0 0 6px; font-weight:600; color:#1f2937;">Need us sooner?</p>
        <p style="margin:0; font-size:14px; line-height:1.55;">
          Call <a href="tel:${SUPPORT_PHONE.replace(/\s/g, '')}" style="color:#247AFD; text-decoration:none;"><strong>${SUPPORT_PHONE}</strong></a> (Mon to Sat, 9 AM to 9 PM) or reply to this email.
        </p>
      </div>
    </div>

    <div style="background:#f3f4f6; padding:16px 24px; font-size:12px; color:#6b7280; text-align:center;">
      <p style="margin:0;">Platypus is operated by Third Planet Solutions Pvt Ltd. India&apos;s certified dog walking service.</p>
      <p style="margin:6px 0 0;">You&apos;re receiving this because you submitted a trial walk request at theplatypus.in.</p>
    </div>
  </div>
    `;
}

function buildPlainText({ booking }) {
    const firstName = (booking.fullName || "").split(" ")[0] || "there";
    const addr = booking.address || {};
    const areaLine = [addr.area, addr.city].filter(Boolean).join(", ") || "your area";
    const slots = Array.isArray(booking.timeSlots) && booking.timeSlots.length
        ? booking.timeSlots.join(", ")
        : (booking.timeSlot || "your preferred slot");
    const dateStr = booking.preferredDate
        ? new Date(booking.preferredDate).toLocaleDateString("en-IN")
        : "your selected date";
    return [
        `Hey ${firstName}, we've got your request.`,
        ``,
        `What happens next:`,
        `1. Our team is checking Guardian availability in ${areaLine}.`,
        `2. We'll call or WhatsApp you within 30 minutes.`,
        `3. Once confirmed, you'll receive Guardian details.`,
        ``,
        `Your request:`,
        `  Start date: ${dateStr}`,
        `  Time slots: ${slots}`,
        `  Area: ${areaLine}${addr.pincode ? " - " + addr.pincode : ""}`,
        `  Mobile: ${booking.mobile || ""}`,
        ``,
        `Track your walks on the Platypus parent app:`,
        `  iOS: ${PARENT_APP_IOS_URL}`,
        `  Android: ${PARENT_APP_ANDROID_URL}`,
        `  Or: ${PARENT_APP_UNIVERSAL_URL}`,
        ``,
        `Need us sooner? Call ${SUPPORT_PHONE} (Mon to Sat, 9 AM to 9 PM) or reply to this email.`,
        ``,
        `Platypus | Third Planet Solutions Pvt Ltd | ${SUPPORT_EMAIL}`,
    ].join("\n");
}

/**
 * Send a lead-confirmation email to the pet parent.
 * Fire-and-forget from the booking handler. Does not throw on send
 * failure — logs and returns a status object so the booking flow
 * stays resilient.
 *
 * @param {Object} booking - the same booking object passed to
 *   sendBookingEmail (the ops-side email). Must include `email`.
 */
export async function sendLeadConfirmationToParent(booking) {
    if (!booking?.email) {
        console.warn("sendLeadConfirmationToParent: no parent email, skipping");
        return { success: false, reason: "no_email" };
    }
    if (!process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL) {
        console.warn("sendLeadConfirmationToParent: Brevo not configured, skipping");
        return { success: false, reason: "brevo_not_configured" };
    }

    try {
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        const tempPrefix = booking.leadTemperature === "hot" ? "[Confirming today] "
            : booking.leadTemperature === "warm" ? "[Confirming soon] "
            : "";
        const subject = `${tempPrefix}Your trial walk request - Platypus`;

        const sendSmtpEmail = {
            sender: {
                email: process.env.BREVO_SENDER_EMAIL,
                name: "Platypus",
            },
            to: [{ email: booking.email, name: booking.fullName || undefined }],
            replyTo: { email: SUPPORT_EMAIL, name: "Platypus Support" },
            subject,
            htmlContent: buildHtml({ booking }),
            textContent: buildPlainText({ booking }),
        };

        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log(`✅ Parent confirmation email sent to ${booking.email}`);
        return { success: true };
    } catch (err) {
        console.error("sendLeadConfirmationToParent: send failed:", err?.message || err);
        return { success: false, error: err?.message };
    }
}
