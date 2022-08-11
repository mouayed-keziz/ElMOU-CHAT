import { Tabs, Badge } from "@mantine/core";
import { IconPhoto, IconMessageCircle, IconSettings } from "@tabler/icons";
import MessagesTab from "./MessagesTab";

export default function ConevrsationTabs() {
  return (
    <Tabs variant="outline" radius="xs" defaultValue="gallery">
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

      <Tabs.Panel value="messages" pt="xs">
        <MessagesTab name={"Mouayed"} />
      </Tabs.Panel>
      <Tabs.Panel value="gallery" pt="xs">
        Gallery
      </Tabs.Panel>
      <Tabs.Panel value="settings" pt="xs">
        Settings
      </Tabs.Panel>
    </Tabs>
  );
}
