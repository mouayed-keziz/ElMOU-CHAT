import firebaseApp from "./firebase";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
const firestore = getFirestore(firebaseApp);

//this funtion gets all the elements in the collection "collectionName" and returns them as an array of "number" elements (default is 10) ordered by "attribute" (default is "createdAt")
const GetCollection = (collectionName, number, attribute) => {
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

//this function adds a new element "object" to the collection "collectionName"
const addNewDocument = async (collectionName, object) => {
  const collectionRef = collection(firestore, collectionName);
  addDoc(collectionRef, object);
};

//this function updates the element with id "id" in the collection "collectionName" with the object "object"
const updateDocument = async (collectionName, id, object) => {
  const collectionRef = collection(firestore, collectionName);
  collectionRef.doc(id).update(object);
};

export { GetCollection, addNewDocument };
