// lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAGg_4D4LvTC-VyJEmUGcBDBUC6TmggAbM",
    authDomain: "naeap-journal.firebaseapp.com",
    projectId: "naeap-journal",
    storageBucket: "naeap-journal.firebasestorage.app",
    messagingSenderId: "138008212633",
    appId: "1:138008212633:web:49c3506d9a6338fa8eb408",
    measurementId: "G-FE4ZVMPHNC"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;