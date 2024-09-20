// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCMldvmCLeiyOM-aR_uZAGJE7EDuxFQnj8",
  authDomain: "kochanet-9ce6e.firebaseapp.com",
  projectId: "kochanet-9ce6e",
  storageBucket: "kochanet-9ce6e.appspot.com",
  messagingSenderId: "445925727679",
  appId: "1:445925727679:web:ab0414795b64c18cc9950a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;