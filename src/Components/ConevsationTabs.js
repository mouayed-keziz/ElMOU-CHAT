import { Tabs } from "@mantine/core";
import { IconMessageCircle, IconPhoto, IconSettings } from "@tabler/icons";
import MessagesTab from "./MessagesTab";

export default function ConevrsationTabs() {
  return (
    <Tabs radius="xs" defaultValue="messages">
      <Tabs.List grow>
        <Tabs.Tab value="messages" icon={<IconMessageCircle size={14} />}>
          Messages
        </Tabs.Tab>
        <Tabs.Tab value="gallery" icon={<IconPhoto size={14} />}>
          Gallery
        </Tabs.Tab>
        <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
          Settings
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="messages">
        <MessagesTab name={"Mouayed"} />
      </Tabs.Panel>
      <Tabs.Panel value="gallery">Gallery</Tabs.Panel>
      <Tabs.Panel value="settings">Settings</Tabs.Panel>
    </Tabs>
  );
}
