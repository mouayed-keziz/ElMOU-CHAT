import {
  Avatar,
  createStyles,
  Group,
  Skeleton,
  Text,
  UnstyledButton,
  Anchor,
} from "@mantine/core";
import { motion } from "framer-motion";
import { IconChevronRight } from "@tabler/icons";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
  dontShowBetweenSmXs: {
    "@media (max-width: 674px)": {
      display: "none",
    },
    "@media (max-width: 643px)": {
      display: "block",
    },
  },
}));

export function ChatCard({ user }) {
  const { classes } = useStyles(null);

  return (
    <Anchor component={Link} to={`/chat/${user.uid}`}>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }}>
        <UnstyledButton className={classes.user}>
          <Group>
            <Avatar src={user.photoURL} radius={"xl"} color="primary">{user.displayName.charAt(0)}</Avatar>
            <div style={{ flex: 1 }}>
              <Text className={classes.dontShowBetweenSmXs} size="sm" weight={500}>
                {user.displayName}
              </Text>

              <Text
                className={classes.dontShowBetweenSmXs}
                color="dimmed"
                size="xs"
              >
                {"last message soon ..."}
              </Text>
            </div>
            <IconChevronRight
              className={classes.dontShowBetweenSmXs}
              size={14}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </motion.div>
    </Anchor >
  );
}

export function SkeletonChatCard() {
  const { classes } = useStyles(null);

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }}>
      <UnstyledButton className={classes.user}>
        <Group>
          <Skeleton height={50} circle />

          <div style={{ flex: 1 }} className={classes.dontShowBetweenSmXs}>
            <Skeleton height={15} radius="xl" mb={8} />
            <Skeleton height={12} radius="xl" width="70%" />
          </div>
          <IconChevronRight
            className={classes.dontShowBetweenSmXs}
            size={14}
            stroke={1.5}
          />
        </Group>
      </UnstyledButton>
    </motion.div>
  );
}
