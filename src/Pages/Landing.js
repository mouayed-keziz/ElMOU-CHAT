import { ThemeIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";
import HeroHeader from "../Components/HeroHeader";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export function SwitchThemeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <ThemeIcon
      variant="outline"
      color={"primary"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      style={{ cursor: "pointer" }}
    >
      {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ThemeIcon>
  );
}

export default function Landing(props) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  if (user) {
    navigate("/chat");
  }
  const { primaryColorHandeler, color } = props;
  return (
    <div>
      <NavigationBar
        primaryColor={color}
        primaryColorHandeler={primaryColorHandeler}
      />
      <HeroHeader color={color} />
      <Footer />
    </div>
  );
}
