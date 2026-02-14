#!/bin/bash
# Platypus Landing - Post-Compromise Credential Rotation Script
# Run on server: /opt/platypus/landing-page/rotate-credentials.sh
#
# This script:
# 1. Backs up the current .env
# 2. Generates a new MongoDB password and rotates it in the running DB
# 3. Updates the .env with the new password
# 4. Prints manual rotation steps for external service credentials

set -euo pipefail

ENV_FILE="/opt/platypus/landing-page/.env"
BACKUP_DIR="/opt/backups/platypus-credentials-$(date +%Y%m%d-%H%M%S)"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()     { echo -e "${CYAN}[$(date +'%H:%M:%S')]${NC} $1"; }
success() { echo -e "${GREEN}[$(date +'%H:%M:%S')] $1${NC}"; }
warn()    { echo -e "${YELLOW}[$(date +'%H:%M:%S')] $1${NC}"; }
fail()    { echo -e "${RED}[$(date +'%H:%M:%S')] $1${NC}"; exit 1; }

# ── Preflight ─────────────────────────────────────────────
[ -f "$ENV_FILE" ] || fail ".env not found at $ENV_FILE"

# ── Step 1: Backup ────────────────────────────────────────
log "Backing up current .env ..."
mkdir -p "$BACKUP_DIR"
cp "$ENV_FILE" "$BACKUP_DIR/.env.bak"
chmod 600 "$BACKUP_DIR/.env.bak"
success "Backup saved to $BACKUP_DIR/.env.bak"

# ── Step 2: Generate new MongoDB password ─────────────────
OLD_MONGO_PW=$(grep '^MONGODB_PASSWORD=' "$ENV_FILE" | cut -d'=' -f2-)
NEW_MONGO_PW=$(openssl rand -base64 32 | tr -dc 'A-Za-z0-9' | head -c 32)

log "Rotating MongoDB password in running database ..."

# Change password in the live MongoDB instance
docker exec platypus_landing_mongodb mongosh \
  --username platypus \
  --password "$OLD_MONGO_PW" \
  --authenticationDatabase admin \
  --eval "db.getSiblingDB('admin').changeUserPassword('platypus', '$NEW_MONGO_PW')" \
  --quiet \
  || fail "Failed to rotate MongoDB password. Is the container running?"

success "MongoDB password rotated in database"

# ── Step 3: Update .env ──────────────────────────────────
log "Updating .env with new MongoDB password ..."
sed -i "s|^MONGODB_PASSWORD=.*|MONGODB_PASSWORD=$NEW_MONGO_PW|" "$ENV_FILE"
success ".env updated with new MongoDB password"

# ── Step 4: Verify MongoDB connectivity ──────────────────
log "Verifying new MongoDB credentials ..."
docker exec platypus_landing_mongodb mongosh \
  --username platypus \
  --password "$NEW_MONGO_PW" \
  --authenticationDatabase admin \
  --eval "db.adminCommand('ping')" \
  --quiet \
  || fail "Verification failed! Old password backup at $BACKUP_DIR/.env.bak"

success "MongoDB credential rotation verified"

# ── Manual rotation checklist ─────────────────────────────
echo ""
echo "================================================================"
echo -e "${YELLOW}  MANUAL CREDENTIAL ROTATION REQUIRED${NC}"
echo "================================================================"
echo ""
echo "The following credentials were EXPOSED during the compromise."
echo "You MUST rotate them on their respective services:"
echo ""
echo -e "${RED}1. Brevo API Key${NC}"
echo "   Current: xkeysib-5958...e20e (COMPROMISED)"
echo "   Rotate at: https://app.brevo.com/settings/keys/api"
echo "   Then update BREVO_API_KEY in $ENV_FILE"
echo ""
echo -e "${RED}2. Google reCAPTCHA Secret Key${NC}"
echo "   Current: 6Le4o_0r...iKa0 (COMPROMISED)"
echo "   Rotate at: https://www.google.com/recaptcha/admin"
echo "   Then update RECAPTCHA_SECRET_KEY in $ENV_FILE"
echo "   Also update NEXT_PUBLIC_RECAPTCHA_SITE_KEY if you regenerate the site key"
echo ""
echo -e "${RED}3. Firebase Private Key (Admin SDK)${NC}"
echo "   Rotate at: https://console.firebase.google.com/project/platypus-d64d7/settings/serviceaccounts/adminsdk"
echo "   Generate a new private key, then update in $ENV_FILE:"
echo "   - FIREBASE_PRIVATE_KEY"
echo "   - FIREBASE_CLIENT_EMAIL (if changed)"
echo ""
echo -e "${RED}4. Firebase Client-Side Keys${NC}"
echo "   If you suspect the Firebase project itself was compromised:"
echo "   https://console.firebase.google.com/project/platypus-d64d7/settings/general"
echo "   Update: NEXT_PUBLIC_FIREBASE_API_KEY and related vars"
echo ""
echo -e "${RED}5. Google Maps API Key${NC}"
echo "   Current: AIzaSyDP...q8RO8 (COMPROMISED)"
echo "   Rotate at: https://console.cloud.google.com/apis/credentials"
echo "   Then update NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in $ENV_FILE"
echo "   IMPORTANT: Add HTTP referrer restrictions (theplatypus.in/*)"
echo ""
echo -e "${RED}6. Telegram Bot Token${NC}"
echo "   Current: 8311897366:AAG9... (COMPROMISED)"
echo "   Rotate via: https://t.me/BotFather -> /revoke -> select bot"
echo "   Then update TELEGRAM_BOT_TOKEN in $ENV_FILE"
echo ""
echo -e "${GREEN}7. MongoDB Password${NC} -- DONE (rotated automatically above)"
echo ""
echo "================================================================"
echo -e "${YELLOW}  After rotating all credentials above, redeploy:${NC}"
echo "  ./redeploy-platypus-walk-landing.sh nextjs-migration"
echo "================================================================"
echo ""
