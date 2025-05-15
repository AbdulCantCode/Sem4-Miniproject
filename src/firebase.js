import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// REPLACE THESE VALUES WITH YOUR ACTUAL CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDcliphWAq1Bixy8-GDqbYmfsbsoFFkrxg", // Your actual key
  authDomain: "dsalearn-v2.firebaseapp.com", // Your actual domain
  databaseURL: "https://dsalearn-v2-default-rtdb.asia-southeast1.firebasedatabase.app", // Must match exactly
  projectId: "dsalearn-v2",
  storageBucket: "dsalearn-v2.appspot.com",
  messagingSenderId: "155001838021",
  appId: "1:155001838021:web:55d793983e9a9ec2e453ac"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);