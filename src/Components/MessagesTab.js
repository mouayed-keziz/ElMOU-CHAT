import {
  Stack,
  Center,
  Avatar,
  Space,
  Code,
  ScrollArea,
  Divider,
  Box,
  createStyles,
} from "@mantine/core";

const useStyle = createStyles((theme) => ({
  stack: {
    gap: 0,
  },
  avatar: {
    borderRadius: "100%",
  },
  AppName: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: "filled", color: theme.primaryColor })
        .background,
      0.1
    ),
    color: theme.white,
    fontWeight: 700,
    fontSize: 28,
    lineHeight: 1.5,
  },
  text: {
    textAlign: "center",
  },
  scrollArea: {
    height: "65vh",
    backgroundColor: theme.backgroundColor,
  },
}));
export default function MessagesTab(props) {
  const { classes } = useStyle(null);
  const { name } = props;
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: "center",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
      })}
    >
      <ScrollArea className={classes.scrollArea}>
        {/*centered text containing this is the start of your conversation with name*/}
        <Center>
          {/*avatar containing the first two letters of name*/}
          <Stack align="center" className={classes.gap}>
            <Space h="lg" />
            <Avatar
              color={"primary"}
              size="xl"
              radius="xl"
              className={classes.avatar}
            >
              {name.substring(0, 2)}
            </Avatar>
            <h2 className={classes.text} mt={-100}>
              {"This is the beggining of your conversation with "}{" "}
              <Code className={classes.AppName}>{name}</Code>
            </h2>
          </Stack>
        </Center>
        <Center>
          <h2>messages here</h2>
        </Center>
      </ScrollArea>
      <Divider my="sm" />
    </Box>
  );
}
