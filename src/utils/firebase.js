// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyAEV1CyxqKHEDsgwMh0ZwPhun4lvcMMwgE",
//   authDomain: "utube-4e06d.firebaseapp.com",
//   projectId: "utube-4e06d",
//   storageBucket: "utube-4e06d.appspot.com",
//   messagingSenderId: "495228966258",
//   appId: "1:495228966258:web:012627e9ce78b1a367b9eb",
//   measurementId: "G-QEPK403ELQ",
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
