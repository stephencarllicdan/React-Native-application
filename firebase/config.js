import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxYmxU06k_pPr_P67JjPY0RkXEl45-kR8",
  authDomain: "licdan-final-project.firebaseapp.com",
  projectId: "licdan-final-project",
  storageBucket: "licdan-final-project.firebasestorage.app",
  messagingSenderId: "1098944341095",
  appId: "1:1098944341095:web:b367d10000ef3bafb3a0c2",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Firestore
export const db = getFirestore(app);

// 🔥 Authentication
export const auth = getAuth(app);