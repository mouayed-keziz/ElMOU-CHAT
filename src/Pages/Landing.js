import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import HeroHeader from "../Components/HeroHeader";

export function SwitchThemeButton() {
      const { colorScheme, toggleColorScheme } = useMantineColorScheme();
      const dark = colorScheme === "dark";
      return (
            <ActionIcon
                  variant="outline"
                  color={"blue"}
                  onClick={() => toggleColorScheme()}
                  title="Toggle color scheme"
            >
                  {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
      );
}

export default function Landing() {
      return <HeroHeader />;
}
