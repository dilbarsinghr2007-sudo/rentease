
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const styleObj = {
  display: "block",
  margin: "40vh auto"
};

const firebaseConfig = {
  apiKey: "AIzaSyBC6vcY_6_oMkNWOjUc5br8gj4dpRM8TWg",
  authDomain: "rentease-77783.firebaseapp.com",
  projectId: "rentease-77783",
  storageBucket: "rentease-77783.firebasestorage.app",
  messagingSenderId: "898623692621",
  appId: "1:898623692621:web:92f096b161a252846ba104",
  measurementId: "G-7HPXGRK769"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
