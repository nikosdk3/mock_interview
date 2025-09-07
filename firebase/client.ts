import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmxTqVkxAQG7fqo65pqwpQv2po_kPvl7c",
  authDomain: "prepai-1a53e.firebaseapp.com",
  projectId: "prepai-1a53e",
  storageBucket: "prepai-1a53e.firebasestorage.app",
  messagingSenderId: "958745088023",
  appId: "1:958745088023:web:0f270ef09d69eaf0bb0c52",
  measurementId: "G-047D57Q11Q",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
