import { Stack } from "@mantine/core";
import { doc, getDoc } from "firebase/firestore";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import ConversationHeader from "./ConevrsationHeader";
import ConevrsationTabs from "./ConevsationTabs";

export default function Conversation() {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const docSnap = await getDoc(doc(db, "users", id));
      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        navigate("/chat");
      }
    }
    getUser();
  }, [id, navigate]);

  return (
    <Stack>
      {user ? (
        <>
          <ConversationHeader user={user} />
          <ConevrsationTabs user={user} />
        </>) : (
        <h1>conversation placeholder (i need to create the ui for this)</h1>
      )}
    </Stack>
  );
}
