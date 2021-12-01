import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA5Vg4YSjv5D-WizL5oyjL0LyLPXoCFK4M",
  authDomain: "crwn-datab-7d47d.firebaseapp.com",
  projectId: "crwn-datab-7d47d",
  storageBucket: "crwn-datab-7d47d.appspot.com",
  messagingSenderId: "987742637541",
  appId: "1:987742637541:web:21c4e57958b31436d2b30c",
  measurementId: "G-8LSF0G39DF",
};

initializeApp(config);

export const auth = getAuth();
export const firestore = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () =>
  signInWithPopup(auth, provider).catch((error) => console.log(error));

export default firebase;
