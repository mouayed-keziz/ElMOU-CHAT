import { motion } from "framer-motion";
import {
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  Paper,
  Transition,
  Modal,
  ColorSwatch,
  CheckIcon,
  ThemeIcon,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { SwitchThemeButton } from "../Pages/Landing";
import { IconColorSwatch } from "@tabler/icons";
const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).color,
    },
  },
}));

export default function NavigationBar(props) {
  const { primaryColorHandeler, primaryColor } = props;
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

  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles(undefined, undefined);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(
        classes.link,
        active === link.link ? classes.linkActive : null
      )}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={0} className={classes.root}>
      <Container className={classes.header}>
        <MantineLogo type="mark" size={28} />
        <Group spacing={5} className={classes.links}>
          {items}
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <SwitchThemeButton />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <PrimaryColorHandelerComponent
              primaryColor={primaryColor}
              primaryColorHandeler={primaryColorHandeler}
            />
          </motion.div>
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}

function PrimaryColorHandelerComponent(props) {
  const { primaryColorHandeler, primaryColor } = props;
  const [opened, setOpened] = useState(false);
  const colors = [
    "indigo",
    "cyan",
    "blue",
    "green",
    "yellow",
    "orange",
    "red",
    "pink",
    "violet",
  ];
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Change Color Palet:"
      >
        <Group position="center" spacing="xs">
          {colors.map((color) => (
            <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }}>
              <ColorSwatch
                style={{
                  cursor: "pointer",
                  border: "1px solid #fff",
                }}
                key={color}
                color={color}
                onClick={() => {
                  primaryColorHandeler(color);
                  setOpened(false);
                }}
              >
                {primaryColor === color && (
                  <CheckIcon color="black" width={10} />
                )}
              </ColorSwatch>
            </motion.div>
          ))}
        </Group>
      </Modal>

      <Group centered>
        <ThemeIcon
          style={{ cursor: "pointer" }}
          variant="outline"
          color={"primary"}
          onClick={() => setOpened(true)}
        >
          {/*change color icon*/}
          <IconColorSwatch />
        </ThemeIcon>
      </Group>
    </>
  );
}
