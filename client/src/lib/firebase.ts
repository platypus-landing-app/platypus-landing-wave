import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Debug: Log Firebase config (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('🔥 Firebase Config:', {
    apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 20)}...` : 'MISSING',
    authDomain: firebaseConfig.authDomain || 'MISSING',
    projectId: firebaseConfig.projectId || 'MISSING',
  });
}

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { app, auth };
