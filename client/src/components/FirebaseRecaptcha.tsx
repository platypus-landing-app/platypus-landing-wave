'use client';

import React from 'react';
import { auth } from '@/lib/firebase';
import { RecaptchaVerifier } from 'firebase/auth';

/**
 * Global Firebase reCAPTCHA component
 * Initializes reCAPTCHA Enterprise badge on page load for optimal UX
 * Badge appears in bottom-right corner immediately when page loads
 */
export default function FirebaseRecaptcha() {
  const recaptchaContainerRef = React.useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    // Only initialize once and only on client side
    if (typeof window === 'undefined' || initialized || window.recaptchaVerifier) {
      return;
    }

    // Use a shorter delay and verify container is mounted
    const timer = setTimeout(() => {
      if (recaptchaContainerRef.current) {
        try {
          console.log('🔐 Initializing Global INVISIBLE Firebase Enterprise reCAPTCHA');
          console.log('  Site Key: 6Le4o_0rAAAAABQz6y4nFzwwC4xO7T5PkKz4PJii');
          console.log('  Container found:', recaptchaContainerRef.current);
          console.log('  Badge will appear in bottom-right corner');

          // Initialize Firebase RecaptchaVerifier globally
          // This is used by TrialBookingDialog for phone OTP
          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            'global-recaptcha-container',
            {
              size: 'invisible',
              callback: () => {
                console.log('✅ Global reCAPTCHA verified');
              },
              'expired-callback': () => {
                console.log('⚠️ Global reCAPTCHA expired');
              },
              'error-callback': (error: any) => {
                console.error('❌ Global reCAPTCHA error:', error);
              }
            }
          );

          // Render the reCAPTCHA explicitly to ensure badge appears
          window.recaptchaVerifier.render().then((widgetId: number) => {
            window.recaptchaWidgetId = widgetId;
            console.log('✅ reCAPTCHA rendered with widget ID:', widgetId);
          });

          setInitialized(true);
          console.log('✅ Global INVISIBLE Enterprise reCAPTCHA initialized and ready');
          console.log('  Available globally as window.recaptchaVerifier');

        } catch (error) {
          console.error('❌ Failed to initialize global reCAPTCHA:', error);
        }
      } else {
        console.error('❌ reCAPTCHA container not found!');
      }
    }, 500); // Shorter delay - 500ms

    return () => clearTimeout(timer);
  }, [initialized]);

  // Cleanup on unmount (shouldn't happen in normal flow)
  React.useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = undefined;
          console.log('🧹 Global reCAPTCHA cleaned up');
        } catch (error) {
          console.error('Error cleaning up global reCAPTCHA:', error);
        }
      }
    };
  }, []);

  return (
    <div
      ref={recaptchaContainerRef}
      id="global-recaptcha-container"
      // Note: Do NOT hide this container - the reCAPTCHA badge must be visible
      // per Google's terms of service. "Invisible" only refers to the challenge.
    />
  );
}
