// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getStorage } from "firebase/storage";
export const firebaseConfig = {
  apiKey: "AIzaSyAHRk7a2frlaZqQ5bOlSIgxQ1yqiwMi5ow",
  authDomain: "portfolio-d0b3d.firebaseapp.com",
  projectId: "portfolio-d0b3d",
  storageBucket: "portfolio-d0b3d.appspot.com",
  messagingSenderId: "372520123661",
  appId: "1:372520123661:web:254c47d3e5ed7c63fc8444",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);
const storage = getStorage();
const app = initializeApp(firebaseConfig);