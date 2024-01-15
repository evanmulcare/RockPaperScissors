import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3RY_7WYV6THShJshDgLYeO4bRzZ6I88A",
  authDomain: "rockps-8a451.firebaseapp.com",
  projectId: "rockps-8a451",
  storageBucket: "rockps-8a451.appspot.com",
  messagingSenderId: "300688676559",
  appId: "1:300688676559:web:1fa749153317c6d2d5c9ba"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
