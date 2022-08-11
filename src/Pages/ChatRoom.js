import { Grid, Stack, Box } from "@mantine/core";
import MessagesNav from "../Components/MessagesNav";
import Conversation from "../Components/Conversation";

export default function ChatRoom() {
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
