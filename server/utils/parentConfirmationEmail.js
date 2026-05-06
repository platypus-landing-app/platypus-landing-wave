// utils/parentConfirmationEmail.js
//
// Sends a rich confirmation email to the pet parent immediately after the
// inquiry form is submitted. Direction: Warm Editorial — cream background
// (#FFFCF0), yellow accent bar (#FFE135), dog-name-first headline.
//
// Hard rules enforced in all copy:
//   - No em-dashes / en-dashes
//   - No AI-tell phrases (delve, tapestry, seamless, robust, etc.)
//   - Dog name leads the headline and subject line
//   - Voice: trusted local service, India-context, warm but direct
//
import SibApiV3Sdk from "sib-api-v3-sdk";
import {
    PARENT_APP_IOS_URL,
    PARENT_APP_ANDROID_URL,
    APP_STORE_BADGE_IMG,
    PLAY_STORE_BADGE_IMG,
} from "./appLinks.js";

const SUPPORT_PHONE = "+91 84518 80963";
const SUPPORT_PHONE_RAW = "+918451880963";
const SUPPORT_EMAIL = "support@theplatypus.in";
const LOGO_URL = "https://www.theplatypus.in/logo.png";

// Inline color + spacing tokens (Warm Editorial)
const C = {
    cream: "#FFFCF0",
    white: "#FFFFFF",
    yellow: "#FFE135",
    blue: "#247AFD",
    ink: "#1A1A2E",
    body: "#374151",
    muted: "#6B7280",
    border: "#E9E5D0",
    footerBg: "#F5F0E0",
};

function escapeHtml(s) {
    return String(s ?? "").replace(/[&<>"']/g, (c) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[c]);
}

// Derives display values from the booking object once, shared by HTML + text
function deriveFields(booking) {
    const firstName = (booking.fullName || "").split(" ")[0] || "there";
    const addr = booking.address || {};
    const areaLine = [addr.area, addr.city].filter(Boolean).join(", ") || addr.city || "your area";
    const pinSuffix = addr.pincode ? ` ${escapeHtml(addr.pincode)}` : "";

    const slots = Array.isArray(booking.timeSlots) && booking.timeSlots.length
        ? booking.timeSlots.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(", ")
        : (booking.timeSlot || "your preferred slot");

    const dateStr = booking.preferredDate
        ? new Date(booking.preferredDate).toLocaleDateString("en-IN", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
        })
        : "your selected date";

    const dogs = Array.isArray(booking.dogs) ? booking.dogs : [];
    const firstDogName = dogs[0]?.name || null;
    const dogsLine = dogs.map((d) => d.name).filter(Boolean).join(", ") || "your pup";

    return { firstName, areaLine, pinSuffix, slots, dateStr, firstDogName, dogsLine };
}

function buildAppBadgeTable() {
    // Table-based layout for email-client badge alignment safety.
    // Apple SVG renders at height="40"; Google Play PNG at height="60" —
    // different heights produce visually matched badge sizes due to
    // differing canvas padding in the official assets.
    return `
<table cellpadding="0" cellspacing="0" border="0" style="margin:0;">
  <tr>
    <td style="padding-right:12px; vertical-align:middle;">
      <a href="${PARENT_APP_IOS_URL}" style="text-decoration:none;">
        <img src="${APP_STORE_BADGE_IMG}"
             height="40"
             alt="Download on the App Store"
             style="height:40px; width:auto; border:0; display:block;" />
      </a>
    </td>
    <td style="vertical-align:middle;">
      <a href="${PARENT_APP_ANDROID_URL}" style="text-decoration:none;">
        <img src="${PLAY_STORE_BADGE_IMG}"
             height="60"
             alt="Get it on Google Play"
             style="height:60px; width:auto; border:0; display:block;" />
      </a>
    </td>
  </tr>
</table>`;
}

function buildHtml({ booking }) {
    const { firstName, areaLine, pinSuffix, slots, dateStr, firstDogName, dogsLine } = deriveFields(booking);

    const dogHeadline = firstDogName
        ? `${escapeHtml(firstDogName)}'s walk is on its way.`
        : "Your walk is on its way.";

    const subHeadline = firstDogName
        ? `Hi ${escapeHtml(firstName)}, we've got ${escapeHtml(firstDogName)}'s details and our team is on it.`
        : `Hi ${escapeHtml(firstName)}, we've got your details and our team is on it.`;

    // Step copy — specific, warm, varied rhythm per seo-content review
    const steps = [
        `We're looking for a Guardian near ${escapeHtml(areaLine)} right now.`,
        `Expect a call or WhatsApp from us within 30 minutes to lock in your slot.`,
        `We'll share your Guardian's name, photo, and any prep notes before the first walk.`,
    ];

    const stepCards = steps.map((text, i) => `
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
  <tr>
    <td style="background:${C.white}; border-left:3px solid ${C.blue}; border-radius:6px; padding:14px 16px;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td style="width:28px; vertical-align:top; padding-right:10px;">
            <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:17px; font-weight:700; color:${C.blue}; line-height:1.4;">${i + 1}</span>
          </td>
          <td style="vertical-align:top;">
            <p style="margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; line-height:1.6; color:${C.body};">${text}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`).join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>Walk confirmation</title>
</head>
<body style="margin:0; padding:0; background-color:#f0ece0;">

<div style="max-width:600px; margin:0 auto; width:100%;">

<!-- Outer wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.cream};">

  <!-- HEADER: logo -->
  <tr>
    <td style="padding:28px 24px 0; background-color:${C.cream};">
      <a href="https://www.theplatypus.in" style="text-decoration:none;">
        <img src="${LOGO_URL}"
             height="44"
             alt="Platypus"
             style="height:44px; width:auto; border:0; display:block;" />
      </a>
    </td>
  </tr>

  <!-- Yellow accent bar (4px, held open with font-size:0 + &nbsp; for Outlook) -->
  <tr>
    <td height="4" style="background-color:${C.yellow}; height:4px; font-size:0; line-height:0;">&nbsp;</td>
  </tr>

  <!-- HEADLINE -->
  <tr>
    <td style="padding:28px 24px 0; background-color:${C.cream};">
      <p style="margin:0 0 8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:${C.muted};">Walk Confirmation</p>
      <h1 style="margin:0 0 10px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:26px; font-weight:700; color:${C.ink}; line-height:1.25;">${dogHeadline}</h1>
      <p style="margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:15px; line-height:1.6; color:${C.body};">${subHeadline}</p>
    </td>
  </tr>

  <!-- Divider -->
  <tr>
    <td style="padding:20px 24px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="border-top:1px solid ${C.border}; height:1px; font-size:0; line-height:0;">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- WHAT HAPPENS NEXT: step cards -->
  <tr>
    <td style="padding:20px 24px 0; background-color:${C.cream};">
      <p style="margin:0 0 14px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; font-weight:700; color:${C.ink};">What happens next</p>
      ${stepCards}
    </td>
  </tr>

  <!-- BOOKING SUMMARY: yellow left-border card -->
  <tr>
    <td style="padding:20px 24px 0; background-color:${C.cream};">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="background:${C.white}; border-left:4px solid ${C.yellow}; border-radius:6px; padding:16px 18px;">
            <p style="margin:0 0 10px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:${C.muted};">Your booking</p>
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="padding-bottom:6px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; color:${C.body}; line-height:1.6;">
                  <strong style="color:${C.ink};">Start date:</strong>&nbsp;${escapeHtml(dateStr)}
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:6px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; color:${C.body}; line-height:1.6;">
                  <strong style="color:${C.ink};">Time slots:</strong>&nbsp;${escapeHtml(slots)}
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:6px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; color:${C.body}; line-height:1.6;">
                  <strong style="color:${C.ink};">Area:</strong>&nbsp;${escapeHtml(areaLine)}${pinSuffix}
                </td>
              </tr>
              <tr>
                <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; color:${C.body}; line-height:1.6;">
                  <strong style="color:${C.ink};">Dog(s):</strong>&nbsp;${escapeHtml(dogsLine)}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Divider -->
  <tr>
    <td style="padding:20px 24px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="border-top:1px solid ${C.border}; height:1px; font-size:0; line-height:0;">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- APP DOWNLOAD -->
  <tr>
    <td style="padding:20px 24px 0; background-color:${C.cream};">
      <p style="margin:0 0 6px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; font-weight:700; color:${C.ink};">Track walks on the Platypus app</p>
      <p style="margin:0 0 14px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; line-height:1.6; color:${C.body};">
        Follow ${firstDogName ? escapeHtml(firstDogName) + "'s" : "your pup's"} walks live on the app. New bookings are on call or WhatsApp for now; in-app booking opens soon.
      </p>
      ${buildAppBadgeTable()}
    </td>
  </tr>

  <!-- Divider -->
  <tr>
    <td style="padding:20px 24px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="border-top:1px solid ${C.border}; height:1px; font-size:0; line-height:0;">&nbsp;</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- SUPPORT -->
  <tr>
    <td style="padding:20px 24px 24px; background-color:${C.cream};">
      <p style="margin:0 0 6px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; font-weight:700; color:${C.ink};">Need us sooner?</p>
      <p style="margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; line-height:1.6; color:${C.body};">
        Call or WhatsApp us at <a href="tel:${SUPPORT_PHONE_RAW}" style="color:${C.blue}; text-decoration:none; font-weight:600;">${SUPPORT_PHONE}</a> (Mon to Sat, 9 AM to 9 PM) or reply to this email.
      </p>
    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td style="background-color:${C.footerBg}; border-top:1px solid ${C.border}; padding:18px 24px; text-align:center;">
      <p style="margin:0 0 4px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; color:${C.muted}; line-height:1.5;">Platypus is operated by Third Planet Solutions Pvt Ltd, Mumbai.</p>
      <p style="margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; color:${C.muted}; line-height:1.5;">You're receiving this because you submitted a walk request at <a href="https://www.theplatypus.in" style="color:${C.muted}; text-decoration:underline;">theplatypus.in</a>.</p>
    </td>
  </tr>

</table>
</div>

</body>
</html>`;
}

function buildPlainText({ booking }) {
    const { firstName, areaLine, slots, dateStr, firstDogName, dogsLine } = deriveFields(booking);
    const dogLine = firstDogName ? `${firstDogName}'s walk is on its way.` : "Your walk is on its way.";
    const addr = booking.address || {};

    return [
        dogLine,
        ``,
        `Hi ${firstName}, we've got ${firstDogName ? firstDogName + "'s" : "your"} details and our team is on it.`,
        ``,
        `What happens next:`,
        `1. We're looking for a Guardian near ${areaLine} right now.`,
        `2. Expect a call or WhatsApp from us within 30 minutes to lock in your slot.`,
        `3. We'll share your Guardian's name, photo, and any prep notes before the first walk.`,
        ``,
        `Your booking:`,
        `  Start date: ${dateStr}`,
        `  Time slots: ${slots}`,
        `  Area: ${areaLine}${addr.pincode ? " " + addr.pincode : ""}`,
        `  Dog(s): ${dogsLine}`,
        ``,
        `Track ${firstDogName ? firstDogName + "'s" : "your pup's"} walks live on the Platypus app:`,
        `  Android: ${PARENT_APP_ANDROID_URL}`,
        `  iOS: ${PARENT_APP_IOS_URL}`,
        ``,
        `Need us sooner? Call or WhatsApp us at ${SUPPORT_PHONE} (Mon to Sat, 9 AM to 9 PM) or reply to this email.`,
        ``,
        `Platypus | Third Planet Solutions Pvt Ltd, Mumbai | ${SUPPORT_EMAIL}`,
    ].join("\n");
}

/**
 * Send a lead-confirmation email to the pet parent.
 * Fire-and-forget from the booking handler. Does not throw on send
 * failure — logs and returns a status object so the booking flow
 * stays resilient.
 *
 * @param {Object} booking - the booking object from the inquiry form.
 *   Must include `email`. See docs for full shape.
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

        const { firstDogName } = deriveFields(booking);
        const dogLabel = firstDogName ? `${firstDogName}'s` : "Your";

        const tempPrefix = booking.leadTemperature === "hot"
            ? `${dogLabel} walk is confirmed for today`
            : booking.leadTemperature === "warm"
            ? `${dogLabel} walk is being confirmed now`
            : `Your walk request is in`;

        const subject = `${tempPrefix} | Platypus`;

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
        console.log(`Parent confirmation email sent to ${booking.email}`);
        return { success: true };
    } catch (err) {
        console.error("sendLeadConfirmationToParent: send failed:", err?.message || err);
        return { success: false, error: err?.message };
    }
}
