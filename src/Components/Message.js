import {
  createStyles,
  Group,
  Text,
  Avatar,
  Box,
  Container,
} from "@mantine/core";

const useStyle = createStyles((theme) => ({
  group: {
    flexDirection: "row-reverse",
  },
  messageContainerSent: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.xl,
    color: theme.white,
    fontWeight: 530,
    fontSize: 19,
    lineHeight: 1.5,
    overflowWrap: "break-word",
  },
  messageContainerReceived: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.xl,
    color: theme.white,
    fontWeight: 530,
    fontSize: 19,
    lineHeight: 1.5,
    overflowWrap: "break-word",
  },
}));
export default function Message(props) {
  const authID = "idTest";
  const { id, text, photo, src, name } = props;

  const { classes } = useStyle(null);
  return (
    <Group mb={10} position={authID === id ? "right" : "left"}>
      <Group className={authID === id ? classes.group : null}>
        <Avatar
          src={photo ? src : null}
          size="lg"
          color="primary"
          radius={"xl"}
        >
          {name ? name.charAt(0) : null}
        </Avatar>
        <Container
          className={
            authID === id
              ? classes.messageContainerSent
              : classes.messageContainerReceived
          }
          size="xs"
          px="md"
          py="xs"
        >
          {text}
        </Container>
      </Group>
    </Group>
  );
}
