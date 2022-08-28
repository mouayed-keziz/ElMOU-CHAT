import { ActionIcon, Anchor, createStyles, Group, Code, UnstyledButton } from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
  },

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

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

export default function Footer() {
  const links = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Portfolio",
      link: "/portfolio",
    },
    {
      label: "Contact",
      link: "/contact",
    },
  ];
  const { classes } = useStyles(undefined, undefined);
  const items = links.map((link) => (
    <Anchor
      color="dimmed"
      key={link.label}
      href={link.link}
      sx={{ lineHeight: 1 }}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Link to="/">
          <UnstyledButton>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Code py={5} className={classes.AppName}>
                ELMOU CHAT
              </Code>
            </motion.div>
          </UnstyledButton>
        </Link>
        <Group className={classes.links}>{items}</Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandLinkedin size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandGithub size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
