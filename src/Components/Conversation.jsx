import { Stack } from "@mantine/core";
import ConversationHeader from "./ConevrsationHeader";
import ConevrsationTabs from "./ConevsationTabs";

export default function Conversation() {
  return (
    <Stack>
      <ConversationHeader name={"Mouayed Keziz"} />
      <ConevrsationTabs />
    </Stack>
  );
}
