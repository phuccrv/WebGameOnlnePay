// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpZQ1MHRiolMVzbt7mgH-y1mFo66Dr-5s",
  authDomain: "starbucks-web.firebaseapp.com",
  projectId: "starbucks-web",
  storageBucket: "starbucks-web.appspot.com",
  messagingSenderId: "866970970475",
  appId: "1:866970970475:web:eefd5df1658e4bde85842e",
  measurementId: "G-00VNEZKZHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);