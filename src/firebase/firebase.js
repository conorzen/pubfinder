// src/firebase/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCA5q5tKMb4_M2ObpwWTjNzxB4PI3fzFDs",
  projectId: "pubfinder-62517",
  storageBucket: "pubfinder-62517.appspot.com",
  messagingSenderId: "978228031673",
  appId: "1:978228031673:ios:c2be91d20326d9c2a22b68"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };