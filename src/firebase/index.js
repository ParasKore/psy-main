import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`,
  measurementId: `${import.meta.env.VITE_FIREBASE_MEASUREMENT_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: "select_account ",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
