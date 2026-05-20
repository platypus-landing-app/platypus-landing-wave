// utils/telegram.js
import TelegramBot from 'node-telegram-bot-api';
import { UAParser } from 'ua-parser-js';
import axios from 'axios';

let bot;
let botInitialized = false;

// Cache IP → city lookups for the lifetime of the process so repeat
// signups from the same NAT'd network don't re-hit ip-api.com.
const ipGeoCache = new Map();

/**
 * Parse a UA string into `device · OS version` (signup-telemetry C4).
 * Returns null when parsing fails or input is empty.
 */
function formatDeviceFromUA(ua) {
    if (!ua) return null;
    try {
        const parsed = new UAParser(ua).getResult();
        const device = [parsed.device.vendor, parsed.device.model]
            .filter(Boolean).join(' ').trim();
        const os = [parsed.os.name, parsed.os.version].filter(Boolean).join(' ');
        const browser = [parsed.browser.name, parsed.browser.version?.split('.')[0]]
            .filter(Boolean).join(' ');
        const head = device || browser || 'Web';
        return os ? `${head} · ${os}` : head;
    } catch (_) {
        return null;
    }
}

/**
 * Resolve IP → 'City, Region, Country' via ip-api.com free tier (45
 * req/min, no key, no IP leak beyond ip-api). Returns null on miss
 * (private range, lookup error, timeout). Caches by IP.
 */
async function resolveIpGeo(ip) {
    if (!ip || ip === 'unknown') return null;
    const clean = ip.split(',')[0].trim().replace(/^::ffff:/, '');
    if (!clean || clean === '::1' || clean.startsWith('127.') || clean.startsWith('10.')) return null;
    if (ipGeoCache.has(clean)) return ipGeoCache.get(clean);
    try {
        const r = await axios.get(`http://ip-api.com/json/${clean}`, {
            params: { fields: 'status,city,regionName,country' },
            timeout: 1500,
        });
        if (r.data?.status === 'success') {
            const out = [r.data.city, r.data.regionName, r.data.country]
                .filter(Boolean).join(', ');
            ipGeoCache.set(clean, out || null);
            return out || null;
        }
    } catch (_) {}
    ipGeoCache.set(clean, null);
    return null;
}

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
        const tempBadge = booking.leadTemperature
            ? ` [${booking.leadTemperature.toUpperCase()}]`
            : '';

        const addr = booking.address || {};
        const addressLines = [
            addr.houseFlat,
            addr.addressLine,
            addr.landmark ? `Landmark: ${addr.landmark}` : null,
            [addr.area, addr.city, addr.pincode].filter(Boolean).join(' - '),
        ].filter(Boolean);
        const addressBlock = addressLines.length
            ? addressLines.map((l) => `   • ${l}`).join('\n')
            : `   • ${booking.location || '(no address)'}`;
        const geo = (addr.lat && addr.lng) ? `   • Geo: ${addr.lat}, ${addr.lng}` : '';

        const dogsInfo = booking.dogs
            .map((dog, i) => {
                const breed = dog.breed === 'Other' ? dog.breedOther : dog.breed;
                const behavior = [
                    dog.gender ? `Gender: ${dog.gender}` : null,
                    dog.weightKg ? `Weight: ${dog.weightKg} kg` : null,
                    dog.friendlyWithStrangers ? `Friendly: ${dog.friendlyWithStrangers}` : null,
                    dog.aggressive ? `Aggressive: ${dog.aggressive}` : null,
                    dog.leashTrained ? `Leash trained: ${dog.leashTrained}` : null,
                    dog.vaccinated ? `Vaccinated: ${dog.vaccinated}` : null,
                ].filter(Boolean).join(' · ');
                const medical = dog.medicalConditions || dog.specialNotes || 'None';
                return [
                    `🐕 *Dog ${i + 1}:* ${dog.name}`,
                    `   • Breed: ${breed}`,
                    `   • Age: ${dog.age || '?'}`,
                    behavior ? `   • ${behavior}` : null,
                    `   • Medical / notes: ${medical}`,
                ].filter(Boolean).join('\n');
            })
            .join('\n\n');

        const slots = Array.isArray(booking.timeSlots) && booking.timeSlots.length
            ? booking.timeSlots.join(', ')
            : (booking.timeSlot || '(none)');
        const walks = booking.walksPerDay === 'custom'
            ? `${booking.walksPerDayCustom || '?'} (custom)`
            : (booking.walksPerDay || '?');
        const situationLabel = {
            no_walker: 'No walker yet',
            unsatisfied: 'Has walker, not satisfied',
            exploring: 'Just exploring',
        }[booking.currentSituation] || booking.currentSituation || '(not provided)';

        const message = `
🎉 *NEW TRIAL WALK BOOKING!*${tempBadge}

👤 *Pet Parent Details*
• Name: ${booking.fullName}
• Mobile: ${booking.mobile}${booking.whatsappEnabled ? ' ✅ WhatsApp' : ''}
• Email: ${booking.email || 'N/A'}

📍 *Address*
${addressBlock}${geo ? '\n' + geo : ''}

${dogsInfo}

🕐 *Walk Preferences*
• Start: ${new Date(booking.preferredDate).toDateString()}
• Walks per day: ${walks}
• Time slots: ${slots}
• Duration: ${booking.durationMinutes ? booking.durationMinutes + ' min' : '?'}
• Current situation: ${situationLabel}

🛡️ *Consent*
• Contact (call/WhatsApp): ${booking.contactConsent ? '✅' : '❌'}
• Accuracy confirmed: ${booking.accuracyConfirmed ? '✅' : '❌'}
• Will supervise first handover: ${booking.superviseHandover ? '✅' : '❌'}

📊 *Metadata*
• Booking ID: \`${booking._id || 'pending'}\`
• Lead temp: ${booking.leadTemperature || 'unknown'}
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

        // Signup-telemetry C4 enrichment — device + geo derived from
        // the metadata we already store on the partial-lead document.
        const device = formatDeviceFromUA(lead?.metadata?.user_agent);
        const geo = await resolveIpGeo(lead?.metadata?.ip_address);
        const telemetryBlock = (device || geo)
            ? `\n\n📡 *Telemetry*\n${device ? `• Device: ${device}\n` : ''}${geo ? `• Location: ${geo}\n` : ''}`.replace(/\n$/, '')
            : '';

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
• Last Updated: ${new Date(lead.last_updated).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}${telemetryBlock}

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
 * Send a notification about a new professional application
 * @param {Object} application - Application data
 */
export async function sendApplicationNotification(application) {
    initializeBot();

    if (!bot || !process.env.TELEGRAM_CHAT_ID) {
        console.log('ℹ️  Skipping Telegram notification (not configured)');
        return { success: false, reason: 'not_configured' };
    }

    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    try {
        const roleLabels = {
            'dog-walker': 'Dog Walker (Guardian)',
            'dog-groomer': 'Dog Groomer',
            'dog-trainer': 'Dog Trainer',
            'pet-sitter': 'Pet Sitter',
        };

        const message = `
🎯 *NEW PROFESSIONAL APPLICATION!*

👤 *Applicant Details*
• Name: ${application.full_name}
• Phone: ${application.phone}
• Email: ${application.email}
• City: ${application.city || 'Mumbai'}
• Area: ${application.area || 'N/A'}

💼 *Professional Info*
• Role: ${roleLabels[application.role] || application.role}
• Experience: ${application.experience}
• Own Transport: ${application.has_own_transport ? '✅ Yes' : '❌ No'}
• Resume: ${application.resume_name || 'Not uploaded'}

📅 *Availability*
• Days: ${(application.available_days || []).join(', ') || 'N/A'}
• Slots: ${(application.preferred_slots || []).join(', ') || 'N/A'}
• Start Immediately: ${application.can_start_immediately ? '✅ Yes' : '❌ No'}

📝 *Why Join*
${application.why_join || 'N/A'}

🐾 *Animal Experience*
${application.animal_experience || 'N/A'}

📊 *Metadata*
• Application ID: \`${application._id || 'pending'}\`
• Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
`;

        await bot.sendMessage(TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
        console.log('✅ Telegram application notification sent');
        return { success: true };
    } catch (error) {
        console.error('❌ Telegram application notification error:', error.message);
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
