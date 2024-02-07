// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey: "AIzaSyCCXIFHnOPPIHsCLs5UW2IKg2NK6eVE-uo",
  authDomain: "krutik-blog.firebaseapp.com",
  projectId: "krutik-blog",
  storageBucket: "krutik-blog.appspot.com",
  messagingSenderId: "875564765809",
  appId: "1:875564765809:web:736838f06b079bfb6701d0",
};
// console.log("firebaseConfig.import.meta.env.VITE_FIREBASE_API_KEY:", import.meta.env.VITE_FIREBASE_API_KEY);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
