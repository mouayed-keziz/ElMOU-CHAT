import {
  Button,
  Container,
  createStyles,
  Group,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import { Link } from "react-router-dom";
import { UndrawChatting } from "react-undraw-illustrations";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export default function HeroHeader(props) {
  const { color } = props;

  const { classes } = useStyles(null);
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <span className={classes.highlight}>ELMou</span> Chat
            </Title>
            <Text color="dimmed" mt="md">
              Fully functional accessible chat application faster than ever –
              this application is built with React, Firebase and Mantine
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={12} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Google Authentication</b> – Sign in with your Google account
              </List.Item>
              <List.Item>
                <b>Real Time chat</b> – Chat with your friends in real time
              </List.Item>
              <List.Item>
                <b>Chat history</b> – View your chat history and search for a
                specific message
              </List.Item>
              <List.Item>
                <b> Emoji support</b> – Send messages with emoji support
              </List.Item>
              <List.Item>
                <b>Dark mode</b> – Toggle between light and dark mode
              </List.Item>
            </List>

            <Group mt={30}>
              <Link to={"/login"}>
                <Button radius="xl" size="md" className={classes.control}>
                  Get started
                </Button>
              </Link>
              <Link to={"/chat"}>
                <Button
                  variant="default"
                  radius="xl"
                  size="md"
                  className={classes.control}
                >
                  Chat
                </Button>
              </Link>
            </Group>
          </div>
          <Container className={classes.image}>
            <UndrawChatting
              primaryColor={color === "blue" ? "rgb(25, 113, 194)" : color}
            />
          </Container>
        </div>
      </Container>
    </div>
  );
}
