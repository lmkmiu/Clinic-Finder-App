// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbdqQlRlOUxQyUXVRED06R5sgEBsH-tUQ",
  authDomain: "clinic-finder-e184e.firebaseapp.com",
  projectId: "clinic-finder-e184e",
  storageBucket: "clinic-finder-e184e.appspot.com",
  messagingSenderId: "223296605740",
  appId: "1:223296605740:web:9a5bc2c07bbcc22d58cb89",
  measurementId: "G-SK1TZ3R42V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;