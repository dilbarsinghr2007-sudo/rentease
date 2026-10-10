// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


export const styleObj={
  display:"block",
  margin:"40vh auto"
}
const firebaseConfig = {
  apiKey: "AIzaSyDcgqxcHTR-EZeGtv-raNXv9-eMnHSnKnE",
  authDomain: "gamelance-b1054.firebaseapp.com",
  projectId: "gamelance-b1054",
  storageBucket: "gamelance-b1054.firebasestorage.app",
  messagingSenderId: "238854082407",
  appId: "1:238854082407:web:81a9ee58fffc3fe92529c2",
  measurementId: "G-HD3H2HJ87R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();