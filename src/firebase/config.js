import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW9YebukoxNv7LUbNBdI6NhnoXtXznEas",
  authDomain: "completo-bb90a.firebaseapp.com",
  projectId: "completo-bb90a",
  storageBucket: "completo-bb90a.appspot.com",
  messagingSenderId: "998868189621",
  appId: "1:998868189621:web:eba447ccc02ef2bbc199fc",
  measurementId: "G-C5QGP70E8S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
