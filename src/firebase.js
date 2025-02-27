import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCv7LTyHSHiY0-ExtganTiCmYK6y7GWSfs",
  authDomain: "taxbuddy-ec196.firebaseapp.com",
  projectId: "taxbuddy-ec196",
  storageBucket: "taxbuddy-ec196.firebasestorage.app",
  messagingSenderId: "481957095349",
  appId: "1:481957095349:web:c8d5854037ddf8ac631bfc",
  measurementId: "G-MQZ1L5TTFC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;