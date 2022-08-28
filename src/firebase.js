import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAS04uI1CNHmzPC_uhAHut4qiLKbNaRphI",
    authDomain: "elmo-chat-web.firebaseapp.com",
    projectId: "elmo-chat-web",
    storageBucket: "elmo-chat-web.appspot.com",
    messagingSenderId: "544066054651",
    appId: "1:544066054651:web:88aa372d410e989e0d835e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };