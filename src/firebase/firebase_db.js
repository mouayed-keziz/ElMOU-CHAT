import firebaseApp from "./firebase";
import { getDatabase, set, ref } from "firebase/database";

const db = getDatabase(firebaseApp);

function writeUserData(userId, name, email, imageUrl) {
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}
export { writeUserData, db };
