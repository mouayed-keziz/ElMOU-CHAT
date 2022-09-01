import { Avatar, Code, createStyles, Group, Navbar, ScrollArea } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons";
import { ChatCard, SkeletonChatCard } from "../Components/ChatCard";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import { useState, useContext, useEffect } from "react";
import { GetAllUsers } from "../actions";



const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    AppName: {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background,
        0.1
      ),
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.fn.lighten(
        theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background,
        0.1
      )}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.fn.lighten(
        theme.fn.variant({
          variant: "filled",
          color: theme.primaryColor,
        }).background,
        0.1
      )}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({
            variant: "filled",
            color: theme.primaryColor,
          }).background,
          0.1
        ),
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },
    twoLastSpams: {
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({
            variant: "filled",
            color: theme.primaryColor,
          }).background,
          0.15
        ),
        [`& .${icon}`]: {
          opacity: 0.2,
        },
      },
    },
  };
});

const data = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2];

export default function MessagesNav() {

  const { currentUser, dispatch } = useContext(AuthContext);
  const [contacts, setContacts] = useState(null);
  useEffect(() => {
    GetAllUsers().then(res => {
      const contactsWithoutMe = res.filter(contact => contact.uid !== currentUser.uid);
      setContacts(contactsWithoutMe);
    });
  }, [currentUser.uid]);

  const { classes } = useStyles(null);

  const ChatCards = (
    <ScrollArea style={{ height: "65vh", borderRadius: "4%" }}>
      {contacts ? (
        contacts.map((contact, index) => (
          <ChatCard
            key={index}
            user={contact}
          />
        ))
      ) : (
        data.map((_, index) => (
          <SkeletonChatCard key={index} />
        ))
      )}

    </ScrollArea>
  );

  //how to know which path



  return (
    <Navbar height={"90vh"} p="md" xs>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Code py={5} className={classes.AppName}>
              ELMOU CHAT
            </Code>
          </motion.div>
          <Avatar color="primary" radius={"xl"} src={currentUser.photoURL} >{currentUser.displayName.charAt(0)}</Avatar>
        </Group>
        {ChatCards}
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a
            href="/settings"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconSettings className={classes.linkIcon} stroke={1.5} />
            <span className={classes.twoLastSpams}>Settings</span>
          </a>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a
            href="/logout"
            className={classes.link}
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: "LOGOUT" });
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span className={classes.twoLastSpams}>Logout</span>
          </a>
        </motion.div>
      </Navbar.Section>
    </Navbar>
  );
}
