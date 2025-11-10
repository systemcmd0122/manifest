// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBgZLKo8UmRWTDyyvSg66BHIBM4t2zZo8",
  authDomain: "houti-c6a12.firebaseapp.com",
  databaseURL: "https://houti-c6a12-default-rtdb.firebaseio.com",
  projectId: "houti-c6a12",
  storageBucket: "houti-c6a12.firebasestorage.app",
  messagingSenderId: "213481589097",
  appId: "1:213481589097:web:fabbe821d61296ff5b55f8",
  measurementId: "G-D8679MZXP7"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);

export { app, database };
