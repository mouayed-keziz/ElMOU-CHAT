import { Avatar, Box, Group, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";

export default function ConversationHeader(props) {
  const { name } = props;
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: "pointer",

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        },
      })}
    >
      <Group>
        <Avatar color="primary" radius="xl">
          {name.slice(0, 2)}
        </Avatar>

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>
        </div>
      </Group>
    </Box>
  );
}
