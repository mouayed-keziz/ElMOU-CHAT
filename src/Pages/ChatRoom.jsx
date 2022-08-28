import { Grid } from "@mantine/core";
import Conversation from "../Components/Conversation";
import MessagesNav from "../Components/MessagesNav";

const ChatRoom = () => {
  return (
    <Grid grow style={{ margin: "0" }}>
      <Grid.Col span={3}>
        <MessagesNav />
      </Grid.Col>
      <Grid.Col span={9}>
        <Conversation />
      </Grid.Col>
    </Grid>
  );
}

export default ChatRoom;
