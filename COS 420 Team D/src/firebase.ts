import { initializeApp } from "firebase/app";
//firebase Authentication SDK
import { getAuth } from "firebase/auth";

//config settings from firebase (do not change)
const firebaseConfig = {
  apiKey: "AIzaSyA8qoOKE2c8COf7kpLW5FlQJQ-3fC6NQW0",
  authDomain: "black-bear-bulletin.firebaseapp.com",
  projectId: "black-bear-bulletin",
  storageBucket: "black-bear-bulletin.firebasestorage.app",
  messagingSenderId: "773605239204",
  appId: "1:773605239204:web:f5d88d29241c848e4eb931",
  measurementId: "G-ZPGTX81J26"
};

//initialize
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//export
const auth = getAuth(app);

export { auth };