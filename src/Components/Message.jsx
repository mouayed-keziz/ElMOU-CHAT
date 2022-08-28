import {
  createStyles,
  Group,
  Text,
  Avatar,
  Container,
  HoverCard,
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
    fontSize: 14,
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
        <HoverCard>
          <HoverCard.Target>
            <Avatar
              src={photo ? src : null}
              size="lg"
              color="primary"
              radius={"xl"}
            >
              {name ? name.charAt(0) : null}
            </Avatar>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">{name}</Text>
          </HoverCard.Dropdown>
        </HoverCard>

        <HoverCard>
          <HoverCard.Target>
            <Container
              className={
                authID === id
                  ? classes.messageContainerReceived
                  : classes.messageContainerReceived
              }
              style={{
                maxWidth: "60%",
                marginLeft: 0,
                marginRight: 0,
              }}
              px="md"
              py="xs"
            >
              {text}
            </Container>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">{"time:27/10/2002"}</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
    </Group>
  );
}
