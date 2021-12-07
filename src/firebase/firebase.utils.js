import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
//prettier-ignore
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyA5Vg4YSjv5D-WizL5oyjL0LyLPXoCFK4M",
  authDomain: "crwn-datab-7d47d.firebaseapp.com",
  projectId: "crwn-datab-7d47d",
  storageBucket: "crwn-datab-7d47d.appspot.com",
  messagingSenderId: "987742637541",
  appId: "1:987742637541:web:21c4e57958b31436d2b30c",
  measurementId: "G-8LSF0G39DF",
};

const app = initializeApp(config);
const db = getFirestore(app);

export const userAuth = getAuth(app);
export const firestore = getFirestore(app);
export const createAccount = createUserWithEmailAndPassword;

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(userAuth, provider).catch((error) => console.log(error));

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", `${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return {
    userRef,
    onSnapshot,
  };
};
