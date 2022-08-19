import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAS04uI1CNHmzPC_uhAHut4qiLKbNaRphI",
    authDomain: "elmo-chat-web.firebaseapp.com",
    projectId: "elmo-chat-web",
    storageBucket: "elmo-chat-web.appspot.com",
    messagingSenderId: "544066054651",
    appId: "1:544066054651:web:88aa372d410e989e0d835e"
};
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);