import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  createStyles,
  Divider,
  Group,
  Input,
  ScrollArea,
  Space,
  Stack,
} from "@mantine/core";
import { IconMail as IconAt, IconSend } from "@tabler/icons";
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
    height: "61vh",
    backgroundColor: theme.backgroundColor,
  },
}));
export default function MessagesTab(props) {
  //generate some messages
  const messages = [
    {
      id: "idTest",
      text: "Hello World",
      photo: true,
      src: "https://avatars0.githubusercontent.com/u/174825?s=460&v=4",
      name: "keziz",
    },
    {
      id: "idTesta",
      text: "Hello World",
      photo: false,
      name: "mouayed",
    },
    {
      id: "idTest",
      text: "Hello World",
      photo: true,
      src: "aa",
      name: "John Doe",
    },
  ];
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
        borderRadius: theme.radius.md,
      })}
    >
      <ScrollArea className={classes.scrollArea}>
        <Box
          sx={(theme) => ({
            padding: theme.spacing.md,
          })}
        >
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
          <Message
            id="idTest2"
            name="Mouayed"
            text="Hello H H H H H H H H H H H H H H H H H H H H H H H H H H H H "
            photo={false}
          />
          {messages.map((message) => (
            <Message
              key={message.id}
              id={message.id}
              name={message.name}
              text={message.text}
              photo={message.photo}
              src={message.src}
            />
          ))}
        </Box>
      </ScrollArea>
      <Divider my="sm" />
      <Group pr={25} pl={25} pb={15}>
        <Input
          icon={<IconAt />}
          sx={{ flex: 1 }}
          variant="filled"
          placeholder="..."
          radius="lg"
          size="lg"
        />
        <ActionIcon color="primary" size="xl" radius="xl" variant="filled">
          <IconSend />
        </ActionIcon>
      </Group>
    </Box>
  );
}
