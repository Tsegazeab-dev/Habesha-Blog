// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "habeshanblog.firebaseapp.com",
  projectId: "habeshanblog",
  storageBucket: "habeshanblog.appspot.com",
  messagingSenderId: "762599341742",
  appId: "1:762599341742:web:dc521e2c1f11cd4b4e373f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

