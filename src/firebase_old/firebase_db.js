import firebaseApp from "./firebase";
import { getDatabase, set, ref } from "firebase/database";

const database = getDatabase(firebaseApp);

function writeUserData(userId, name, email, imageUrl) {
  set(ref(database, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}
export { writeUserData };
