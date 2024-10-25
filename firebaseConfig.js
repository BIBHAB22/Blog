// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAaXsIwvcCokgt6OOFb4nyAzgxIrw-e9d8",
  authDomain: "yumyard-ff188.firebaseapp.com",
  databaseURL: "https://yumyard-ff188-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yumyard-ff188",
  storageBucket: "yumyard-ff188.appspot.com",
  messagingSenderId: "267348044924",
  appId: "1:267348044924:web:bf26f13bfe914a5af8adf9",
  measurementId: "G-4TYPHK14BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);