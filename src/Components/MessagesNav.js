import { Code, createStyles, Group, Navbar, ScrollArea } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons";
import { ChatCard, SkeletonChatCard } from "../Components/ChatCard";

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
                  color:
                        theme.colorScheme === "dark"
                              ? theme.white
                              : theme.black,
                  opacity: 0.75,
                  marginRight: theme.spacing.sm,
            },
            twoLastSpams: {
                  color:
                        theme.colorScheme === "dark"
                              ? theme.white
                              : theme.black,
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
      const { classes } = useStyles(null);

      const ChatCards = (
            <ScrollArea style={{ height: "65vh", borderRadius: "4%" }}>
                  {data.map((v) => (
                        <div>
                              {v !== 2 ? (
                                    <ChatCard
                                          image={"/logo192.png"}
                                          name={"Mouayed KEZIZ"}
                                          lastMessage={"Hello world!"}
                                          isImg={v}
                                    />
                              ) : (
                                    <SkeletonChatCard />
                              )}
                        </div>
                  ))}
            </ScrollArea>
      );

      return (
            <Navbar height={"90vh"} p="md">
                  <Navbar.Section grow>
                        <Group className={classes.header} position="apart">
                              <Code className={classes.AppName}>
                                    ELMOU CHAT
                              </Code>
                        </Group>
                        {ChatCards}
                  </Navbar.Section>
                  <Navbar.Section className={classes.footer}>
                        <a
                              href="/settings"
                              className={classes.link}
                              onClick={(event) => event.preventDefault()}
                        >
                              <IconSettings
                                    className={classes.linkIcon}
                                    stroke={1.5}
                              />
                              <span className={classes.twoLastSpams}>
                                    Settings
                              </span>
                        </a>

                        <a
                              href="/logout"
                              className={classes.link}
                              onClick={(event) => event.preventDefault()}
                        >
                              <IconLogout
                                    className={classes.linkIcon}
                                    stroke={1.5}
                              />
                              <span className={classes.twoLastSpams}>
                                    Logout
                              </span>
                        </a>
                  </Navbar.Section>
            </Navbar>
      );
}
