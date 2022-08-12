import { initializeApp } from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import {
  addDoc,
  collection,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

//init firebase
const app = initializeApp({
  apiKey: "AIzaSyB7nIsZHQfG4aruEEYK-WPSMo6-qk8JoN0",
  authDomain: "sincere-apex-344920.firebaseapp.com",
  projectId: "sincere-apex-344920",
  storageBucket: "sincere-apex-344920.appspot.com",
  messagingSenderId: "752888493027",
  appId: "1:752888493027:web:5d3c16f6c72ef43ea566d6",
  measurementId: "G-L0CXWXBR15",
});

//init auth and firestore
const auth = getAuth();
const firestore = getFirestore(app);

//open a popup to sign in with google, the result will take effect by changing the auth state
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

//gett all the documents in the collection "collectionName" and return them as an array of "number" elements (default is 10) ordered by "attribute" (default is "createdAt")
const GetData = (collectionName, number, attribute) => {
  const collectionRef = collection(firestore, collectionName);
  if (attribute === null) attribute = "createdAt";
  if (number === null) number = 10;
  const collectionQuery = query(
    collectionRef,
    orderBy(attribute),
    limit(number)
  );
  const [data] = useCollectionData(collectionQuery, { idField: "id" });
  return data;
};

//add new document "newElement" to the collection "collectionName"
const addNewDocument = async (collectionName, newElement) => {
  const collectionRef = collection(firestore, collectionName);
  addDoc(collectionRef, newElement);
};

export { app, auth, firestore, signInWithGoogle, GetData, addNewDocument };
