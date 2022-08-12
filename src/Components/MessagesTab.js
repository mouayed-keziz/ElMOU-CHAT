import {
  Avatar,
  Box,
  Center,
  Code,
  createStyles,
  Divider,
  ScrollArea,
  Space,
  Stack,
} from "@mantine/core";
import Message from "./Message";

const useStyle = createStyles((theme) => ({
  stack: {
    gap: 0,
  },
  avatar: {
    borderRadius: "100%",
  },
  AppName: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      0.1
    ),
    borderRadius: theme.radius.lg,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    color: theme.white,
    fontWeight: 700,
    fontSize: 28,
    lineHeight: 1.5,
  },
  text: {
    textAlign: "center",
    margin: 0,
    padding: 0,
  },
  scrollArea: {
    height: "70vh",
    backgroundColor: theme.backgroundColor,
  },
}));
export default function MessagesTab(props) {
  const { classes } = useStyle(null);
  const { name } = props;
  return (
    <Box
      sx={(theme) => ({
        marginTop: theme.spacing.md,
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: "center",
        padding: theme.spacing.sm,
        borderRadius: theme.radius.md,
      })}
    >
      <ScrollArea className={classes.scrollArea}>
        <Center>
          <Stack align="center" className={classes.gap}>
            <Space h="xs" />
            <Avatar
              color={"primary"}
              size="xl"
              radius="xl"
              className={classes.avatar}
              m={0}
              p={0}
            >
              {name.charAt(0)}
            </Avatar>
            {/*
              <h2 className={classes.text}>
                <Code className={classes.AppName}>{name}</Code>
              </h2>
            */}
          </Stack>
        </Center>
        <Space h={"xl"} />
        <Space h={"xl"} />
        <Message
          id="idTest"
          name="Mouayed"
          text="Hello H H H H H H H H H H H H H H H H H H H H H H H H H H H H "
          photo={true}
          src="/logo192.png"
        />
        <Message id="idTest2" name="Mouayed" text="Hello world" photo={false} />
      </ScrollArea>
      <Divider my="sm" />
    </Box>
  );
}
