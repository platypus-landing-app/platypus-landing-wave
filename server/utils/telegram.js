// utils/telegram.js
import TelegramBot from 'node-telegram-bot-api';

let bot;
let botInitialized = false;

// Lazy initialization - only create bot when first needed
function initializeBot() {
    if (botInitialized) return;
    botInitialized = true;

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
        console.log('✅ Telegram Bot initialized');
    } else {
        console.warn('⚠️  Telegram credentials not configured. Notifications will be skipped.');
    }
}

/**
 * Send a formatted notification about a new booking
 * @param {Object} booking - Booking data
 */
export async function sendBookingNotification(booking) {
    initializeBot(); // Lazy initialization

    if (!bot || !process.env.TELEGRAM_CHAT_ID) {
        console.log('ℹ️  Skipping Telegram notification (not configured)');
        return { success: false, reason: 'not_configured' };
    }

    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    try {
        const dogsInfo = booking.dogs
            .map((dog, i) => {
                const breed = dog.breed === 'Other' ? dog.breedOther : dog.breed;
                return `🐕 *Dog ${i + 1}:* ${dog.name}\n   • Breed: ${breed}\n   • Age: ${dog.age || '?'}\n   • Notes: ${dog.specialNotes || 'None'}`;
            })
            .join('\n\n');

        const message = `
🎉 *NEW TRIAL WALK BOOKING!*

👤 *Owner Details*
• Name: ${booking.fullName}
• Mobile: ${booking.mobile}${booking.whatsappEnabled ? ' ✅ WhatsApp' : ''}
• Email: ${booking.email || 'N/A'}

${dogsInfo}

🕐 *Walk Preferences*
• Date: ${new Date(booking.preferredDate).toDateString()}
• Time: ${booking.timeSlot}
• Location: ${booking.location}

🛡️ *Safety*
• Vaccinations: ${booking.vaccinationsUpToDate ? '✅ Yes' : '❌ No'}
• Supervise Handover: ${booking.superviseHandover ? '✅ Yes' : '❌ No'}

📊 *Metadata*
• Booking ID: \`${booking._id || 'pending'}\`
• Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
• reCAPTCHA Score: ${booking.recaptchaScore || 'N/A'}
`;

        await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
        console.log('✅ Telegram booking notification sent');
        return { success: true };
    } catch (error) {
        console.error('❌ Telegram notification error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Send a notification about a partial lead (abandoned booking)
 * @param {Object} lead - Partial lead data
 */
export async function sendPartialLeadNotification(lead) {
    initializeBot(); // Lazy initialization

    if (!bot || !process.env.TELEGRAM_CHAT_ID) {
        console.log('ℹ️  Skipping Telegram notification (not configured)');
        return { success: false, reason: 'not_configured' };
    }

    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    try {
        const stepNames = {
            0: 'Started form (no data)',
            1: 'Entered name/phone (verified)',
            2: 'Added dog details',
            3: 'Selected date/time',
            4: 'Final step (not submitted)'
        };

        const formDataInfo = lead.form_data ? Object.entries(lead.form_data)
            .filter(([key, value]) => value && value !== '')
            .map(([key, value]) => `   • ${key}: ${JSON.stringify(value)}`)
            .join('\n') : 'No data captured';

        const message = `
⚠️ *PARTIAL LEAD - ABANDONED BOOKING*

📱 *Contact Info*
• Phone: ${lead.phone}${lead.whatsapp_enabled ? ' ✅ WhatsApp' : ''}
• Name: ${lead.full_name || 'Not provided'}
• Email: ${lead.email || 'Not provided'}

📊 *Progress*
• Status: ${lead.status}
• Step Reached: ${stepNames[lead.step_reached] || `Step ${lead.step_reached}`}
• Firebase UID: \`${lead.firebase_uid || 'N/A'}\`

📝 *Captured Data*
${formDataInfo}

🕐 *Timing*
• Started: ${new Date(lead.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
• Last Updated: ${new Date(lead.last_updated).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

💡 *Action Required*
Consider reaching out to complete the booking!
`;

        await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
        console.log('✅ Telegram partial lead notification sent');
        return { success: true };
    } catch (error) {
        console.error('❌ Telegram partial lead notification error:', error.message);
        return { success: false, error: error.message };
    }
}

/**
 * Send a test notification to verify bot is working
 */
export async function sendTestNotification() {
    initializeBot(); // Lazy initialization

    if (!bot || !process.env.TELEGRAM_CHAT_ID) {
        throw new Error('Telegram bot not configured');
    }

    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    try {
        const message = `
✅ *Telegram Bot Test*

Your Platypus Leads Bot is working correctly!

🤖 Bot Token: Configured
💬 Chat ID: ${TELEGRAM_CHAT_ID}
🕐 Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

You will receive notifications for:
• ✅ New bookings (completed forms)
• ⚠️ Partial leads (abandoned forms)
`;

        await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
        console.log('✅ Telegram test notification sent');
        return { success: true };
    } catch (error) {
        console.error('❌ Telegram test notification error:', error.message);
        throw error;
    }
}
