// utils/whatsappStub.js
//
// Sends a WhatsApp-template-shaped notification.
//
// Currently routes to the internal Telegram channel until a real WhatsApp
// Business provider (Wati / AiSensy / 360Dialog / Twilio) is wired up.
//
// SWAP POINT: replace the bot.sendMessage call below with the WA provider
// SDK call. The function signature should remain stable.
import TelegramBot from "node-telegram-bot-api";

let bot;
let botInitialized = false;

function initializeBot() {
    if (botInitialized) return;
    botInitialized = true;
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    if (TELEGRAM_BOT_TOKEN) {
        bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
    }
}

/**
 * Send a WA-template-shaped lead-confirmation notification.
 * @param {Object} params
 * @param {string} params.fullName
 * @param {string} params.phone
 * @param {string} [params.leadTemperature]
 * @param {Object} [params.address]
 */
export async function sendWhatsAppLikeNotification({ fullName, phone, leadTemperature, address }) {
    initializeBot();
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    if (!bot || !TELEGRAM_CHAT_ID) {
        console.log("ℹ️  whatsappStub: Telegram not configured, skipping");
        return { success: false, reason: "not_configured" };
    }

    const firstName = (fullName || "").split(" ")[0] || "there";
    const tempBadge = leadTemperature ? `*${leadTemperature.toUpperCase()}*` : "";
    const areaLine = [address?.area, address?.city, address?.pincode].filter(Boolean).join(" · ") || "—";

    const message = [
        `🐾 NEW LEAD ${tempBadge}`,
        `Name: ${fullName}`,
        `Phone: ${phone}`,
        `Area: ${areaLine}`,
        ``,
        `WhatsApp template (manual send for now):`,
        `Hey ${firstName}, thanks for your request! Our team is checking Guardian availability in your area. We'll get back to you within 30 minutes.`,
    ].join("\n");

    try {
        await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: "Markdown" });
        return { success: true };
    } catch (err) {
        console.error("whatsappStub: failed to dispatch", err);
        return { success: false, error: err.message };
    }
}
