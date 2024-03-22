// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_OAUTH_API_KEY,
  authDomain: "mern-estate-a45b0.firebaseapp.com",
  projectId: "mern-estate-a45b0",
  storageBucket: "mern-estate-a45b0.appspot.com",
  messagingSenderId: "351003146105",
  appId: "1:351003146105:web:49a0d18fc128a372d761a8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);