import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import Navbar from "../Components/Navbar";
import HeroHeader from "../Components/HeroHeader";
import Footer from "../Components/Footer";

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
  return (
    <div className="App">
      <Navbar links />
      <div style={{ marginTop: "-130px" }}>
        <HeroHeader />
      </div>
      <Footer />
    </div>
  );
}
