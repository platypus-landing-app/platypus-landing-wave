// utils/iosWaitlistEmail.js
//
// Confirmation email sent to a lead who signed up for the iPhone waitlist
// at /ios-access. Mirrors parentConfirmationEmail.js visual style (Warm
// Editorial — cream background, yellow accent bar, real Platypus logo).
//
// Hard rules:
//   - No em-dashes / en-dashes
//   - No AI-tell phrases
//   - Voice: warm, India-context, direct
//
import SibApiV3Sdk from "sib-api-v3-sdk";
import { PARENT_APP_ANDROID_URL, PLAY_STORE_BADGE_IMG } from "./appLinks.js";

const SUPPORT_EMAIL = "support@theplatypus.in";
const LOGO_URL = "https://www.theplatypus.in/logo.png";

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

function buildHtml({ name }) {
    const firstName = (name || "").split(" ")[0] || "there";
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>You're on the iPhone list</title>
</head>
<body style="margin:0; padding:0; background-color:#f0ece0;">
<div style="max-width:600px; margin:0 auto; width:100%;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.cream};">

  <tr>
    <td style="padding:28px 24px 0; background-color:${C.cream};">
      <a href="https://www.theplatypus.in" style="text-decoration:none;">
        <img src="${LOGO_URL}" height="44" alt="Platypus" style="height:44px; width:auto; border:0; display:block;" />
      </a>
    </td>
  </tr>

  <tr>
    <td height="4" style="background-color:${C.yellow}; height:4px; font-size:0; line-height:0;">&nbsp;</td>
  </tr>

  <tr>
    <td style="padding:28px 24px 0; background-color:${C.cream};">
      <p style="margin:0 0 8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:${C.muted};">iPhone Waitlist</p>
      <h1 style="margin:0 0 10px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:26px; font-weight:700; color:${C.ink}; line-height:1.25;">${escapeHtml(firstName)}, you're on the list.</h1>
      <p style="margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:15px; line-height:1.6; color:${C.body};">The moment Platypus is back on the App Store, we'll send the link straight to your inbox.</p>
    </td>
  </tr>

  <tr>
    <td style="padding:24px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.white}; border:1px solid ${C.border}; border-radius:8px;">
        <tr>
          <td style="padding:18px 20px;">
            <p style="margin:0 0 6px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; font-weight:600; color:${C.ink};">Don't want to wait?</p>
            <p style="margin:0 0 14px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:14px; line-height:1.55; color:${C.body};">Our Android app is live. Track walks in real time, see your Guardian's profile, and rate every walk.</p>
            <a href="${PARENT_APP_ANDROID_URL}" style="text-decoration:none; display:inline-block;">
              <img src="${PLAY_STORE_BADGE_IMG}" height="60" alt="Get it on Google Play" style="height:60px; width:auto; border:0; display:block;" />
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style="padding:0 24px 24px;">
      <p style="margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:13px; line-height:1.6; color:${C.body};">Questions? Reply to this email or write to <a href="mailto:${SUPPORT_EMAIL}" style="color:${C.blue}; text-decoration:none;">${SUPPORT_EMAIL}</a>.</p>
    </td>
  </tr>

  <tr>
    <td style="background-color:${C.footerBg}; padding:18px 24px; text-align:center; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif; font-size:12px; color:${C.muted};">
      Platypus is operated by Third Planet Solutions Pvt Ltd, Mumbai.
    </td>
  </tr>

</table>
</div>
</body>
</html>`;
}

function buildPlainText({ name }) {
    const firstName = (name || "").split(" ")[0] || "there";
    return [
        `${firstName}, you're on the iPhone waitlist.`,
        ``,
        `The moment Platypus is back on the App Store, we'll send the link straight to your inbox.`,
        ``,
        `Don't want to wait? Our Android app is live:`,
        `${PARENT_APP_ANDROID_URL}`,
        ``,
        `Questions? Reply to this email or write to ${SUPPORT_EMAIL}.`,
        ``,
        `Platypus | Third Planet Solutions Pvt Ltd | Mumbai`,
    ].join("\n");
}

/**
 * Send iOS waitlist confirmation email. Fire-and-forget. Does not throw on
 * send failure — logs and returns a status object so the route stays
 * resilient.
 *
 * @param {Object} lead
 * @param {string} lead.name
 * @param {string} lead.email
 */
export async function sendIosWaitlistConfirmation({ name, email }) {
    if (!email) {
        console.warn("sendIosWaitlistConfirmation: no email, skipping");
        return { success: false, reason: "no_email" };
    }
    if (!process.env.BREVO_API_KEY || !process.env.BREVO_SENDER_EMAIL) {
        console.warn("sendIosWaitlistConfirmation: Brevo not configured, skipping");
        return { success: false, reason: "brevo_not_configured" };
    }

    try {
        const defaultClient = SibApiV3Sdk.ApiClient.instance;
        defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        const sendSmtpEmail = {
            sender: { email: process.env.BREVO_SENDER_EMAIL, name: "Platypus" },
            to: [{ email, name: name || undefined }],
            replyTo: { email: SUPPORT_EMAIL, name: "Platypus Support" },
            subject: `You're on the iPhone list | Platypus`,
            htmlContent: buildHtml({ name }),
            textContent: buildPlainText({ name }),
        };

        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log(`✅ iOS waitlist confirmation sent to ${email}`);
        return { success: true };
    } catch (err) {
        console.error("sendIosWaitlistConfirmation: send failed:", err?.message || err);
        return { success: false, error: err?.message };
    }
}
