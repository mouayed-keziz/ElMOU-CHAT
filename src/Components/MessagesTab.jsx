import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Code,
  createStyles,
  Divider,
  Group,
  ScrollArea,
  Space,
  Stack,
  TextInput,
} from "@mantine/core";
import { IconMail as IconAt, IconSend } from "@tabler/icons";
import { doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { useEffect, useContext, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";
import Message from "./Message";
import { addMessage } from "../actions"

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
    fontSize: 18,
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
export default function MessagesTab({ user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const bottomOfTheConversation = useRef();
  const { classes } = useStyle(null);

  useEffect(() => {
    const getMessages = async () => {
      if (currentUser && user) {
        const senderIsBigger = currentUser.uid.localeCompare(user.uid);
        let convId = "";
        if (senderIsBigger === -1) {
          convId = currentUser.uid + user.uid;
        }
        else {
          convId = user.uid + currentUser.uid;
        }
        const unsub = onSnapshot(doc(db, "conversations", convId), (doc) => {
          console.log("Current data: ", doc.data());
          if (doc.data()) {
            setMessages(doc.data().messages);
          }
          else {
            setMessages([]);
          }
          bottomOfTheConversation.current.scrollIntoView({ behavior: "smooth" });
        });
      }

    }
    getMessages();
  }, [currentUser, user]);

  const submitHandeler = (e) => {
    e.preventDefault();
    if (message !== "") {
      addMessage(message, currentUser.uid, user.uid);
      setMessage("");
      bottomOfTheConversation.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <Box sx={(theme) => ({
      marginTop: theme.spacing.md,
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
      textAlign: "center",
      borderRadius: theme.radius.md,
    })}
    >
      <ScrollArea className={classes.scrollArea}>
        <Box sx={(theme) => ({ padding: theme.spacing.md, })} >
          <Center>
            <Stack align="center" className={classes.gap}>
              <Space h="xs" />
              <Avatar color={"primary"} size="xl" radius="xl" className={classes.avatar} m={0} p={0} src={user.photoURL} >
                {user.displayName.charAt(0)}
              </Avatar>
              <h2 className={classes.text}>
                <Code className={classes.AppName}>{user.displayName}</Code>
              </h2>
            </Stack>
          </Center>
          <Space h={"xl"} />
          <Space h={"xl"} />
          {messages === null ? ("loading...") :
            messages.length === 0 ? (`start your conversation with ${user.displayName}`) :
              <>
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    id={message.senderId}
                    text={message.message}
                    user={user}
                    time={message.time}
                  />
                ))}
              </>
          }

          <Space h={"xl"} />
          <span ref={bottomOfTheConversation}></span>
        </Box>
      </ScrollArea>
      <Divider my="sm" />
      <form onClick={submitHandeler}>
        <Group pr={25} pl={25} pb={15}>
          <TextInput
            autocomplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            icon={<IconAt />}
            sx={{ flex: 1 }}
            variant="filled"
            placeholder="..."
            radius="lg"
            size="lg"
          />
          <ActionIcon type={"submit"} color="primary" size="xl" radius="xl" variant="filled">
            <IconSend />
          </ActionIcon>
        </Group>
      </form>
    </Box>
  );
}
