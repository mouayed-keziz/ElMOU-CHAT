import { Grid } from "@mantine/core";
import Conversation from "../Components/Conversation";
import MessagesNav from "../Components/MessagesNav";
import { Routes, Route } from "react-router-dom";
const ChatRoom = () => {
  return (
    <Grid grow style={{ margin: "0" }}>
      <Grid.Col span={3}>
        <MessagesNav />
      </Grid.Col>
      <Grid.Col span={9}>
        <Routes>
          <Route path="/" element={<>makanch convo ahbb (need to create ui for this)</>} />
          <Route path="/:id" element={<Conversation />} />
        </Routes>
      </Grid.Col>
    </Grid>
  );
}

export default ChatRoom;
