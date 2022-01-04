import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
//prettier-ignore
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  writeBatch,
} from "firebase/firestore";

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
export const db = getFirestore();
export const userAuth = getAuth(app);
export const firestore = getFirestore(app);
export const createAccount = createUserWithEmailAndPassword;
export const signInAccount = signInWithEmailAndPassword;

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);

  objectsToAdd.forEach((element) => {
    const docRef = doc(collection(db, collectionKey));
    console.log({ docRef });
    batch.set(docRef, element);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
  const transformedCollection = collectionsSnapshot.docs.map((docSnapshot) => {
    const { title, items } = docSnapshot.data();

    return {
      routeName: encodeURI(title.toLowerCase?.()),

      id: docSnapshot.id,
      title,
      items,
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase?.()] = collection;
    return accumulator;
  }, {});
};
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
