import { Grid } from "@mantine/core";
import Conversation from "../Components/Conversation";
import MessagesNav from "../Components/MessagesNav";
import { Routes, Route, useLocation } from "react-router-dom";
import NoConversationChooseOne from "../Components/NoConversationChooseOne";
const ChatRoom = () => {
  const location = useLocation().pathname;
  const Convo = (location === "/chat/" || location === "/chat") ? false : true;
  return (
    <Grid grow style={{ margin: "0" }}>
      <Grid.Col span={3}
        sx={(theme) => ({
          "@media (max-width: 643px)": {
            display: Convo ? "none" : "block",
          },
        })}>
        <MessagesNav />
      </Grid.Col>
      <Grid.Col span={9}>
        <Routes>
          <Route path="/" element={<NoConversationChooseOne />} />
          <Route path="/:id" element={<Conversation />} />
        </Routes>
      </Grid.Col>
    </Grid>
  );
}

export default ChatRoom;
