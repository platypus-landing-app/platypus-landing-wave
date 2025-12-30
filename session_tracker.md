# Platypus Landing Page - Session Tracker

## Session: 2025-12-29

### Issues Fixed

1. **Server Disk Full (Critical)**
   - Root cause: `/dev/sda1` was 100% full (150GB used, 0 available)
   - Impact: MongoDB couldn't start, backend API failed, caused CORS errors on frontend
   - Resolution:
     - Cleaned up unused Docker images: **18GB reclaimed**
     - Deleted 195 backup directories older than 7 days from `/opt/backups`
     - Final state: 25GB free (84% usage)

2. **MongoDB Crash Loop**
   - Root cause: "No space left on device" error in WiredTiger journal
   - Resolution: Restarted after disk cleanup, now healthy

3. **CORS Errors on API Calls**
   - Error: `Access to fetch at 'https://api.theplatypus.in/api/leads/verify-phone-and-save' blocked by CORS policy`
   - Root cause: Backend wasn't responding properly due to MongoDB being down
   - Resolution: Fixed automatically once MongoDB was restored

4. **reCAPTCHA / OTP Verification Failed**
   - Error: `FirebaseError: Firebase: Error (auth/captcha-check-failed)`
   - Root cause: Firebase Phone Auth enforcement mode was set to **ENFORCE**, but reCAPTCHA Enterprise was not fully integrated with Firebase App Check
   - Resolution: Changed enforcement mode from **ENFORCE** to **AUDIT** in Firebase Console
   - Location: Firebase Console → Authentication → Settings → reCAPTCHA → Phone authentication enforcement mode

### Server Details
- SSH: `ssh quantalynk`
- Project path: `/opt/platypus/landing-page`
- Containers: `platypus_landing_frontend`, `platypus_landing_backend`, `platypus_landing_mongodb`

---

## Postponed Tasks

### Firebase App Check + reCAPTCHA Enterprise Integration
**Priority:** Medium
**Status:** Deferred to next session

**Background:**
Currently using AUDIT mode for reCAPTCHA which works but doesn't hard-block suspicious requests. To enable ENFORCE mode for stronger bot protection, need to properly integrate reCAPTCHA Enterprise with Firebase App Check.

**Steps Required:**
1. Enable Firebase App Check in Firebase Console for the project (`platypus-d64d7`)
2. Register the web app with reCAPTCHA Enterprise as the App Check provider
3. Add App Check initialization in frontend code:
   ```typescript
   import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

   const appCheck = initializeAppCheck(app, {
     provider: new ReCaptchaEnterpriseProvider('6Le4o_0rAAAAABQz6y4nFzwwC4xO7T5PkKz4PJii'),
     isTokenAutoRefreshEnabled: true
   });
   ```
4. Test OTP flow with ENFORCE mode enabled
5. Monitor reCAPTCHA scores in Firebase Console

**Current reCAPTCHA Keys:**
- Enterprise Key (configured): `6Le4o_0rAAAAABQz6y4nFzwwC4xO7T5PkKz4PJii`
- Firebase Internal Key (auto-used): `6LcMZR0UAAAAALgPMcgHwga7gY5p8QMg1Hj-bmUv`

**References:**
- Firebase App Check docs: https://firebase.google.com/docs/app-check/web/recaptcha-enterprise-provider
- reCAPTCHA Enterprise Console: https://console.cloud.google.com/security/recaptcha

---

## Maintenance Notes

### Disk Space Management
The server tends to accumulate:
- Docker images (prune unused images periodically)
- Backup directories in `/opt/backups` (currently 201 directories were found)

**Recommended cleanup commands:**
```bash
# Prune Docker images older than 24 hours
docker image prune -a -f --filter 'until=24h'

# Delete backups older than 7 days
find /opt/backups -maxdepth 1 -type d -mtime +7 -exec rm -rf {} \;

# Check disk usage
df -h /
```

Consider setting up a cron job to automate backup cleanup.
