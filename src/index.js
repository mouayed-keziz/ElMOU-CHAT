import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApplicationRoutingAndThemeManager />
  </React.StrictMode>
);

function ApplicationRoutingAndThemeManager() {
  const theme = JSON.parse(localStorage.getItem("theme")) || "dark";
  console.log("theme", theme);
  const preferredColorScheme = useColorScheme(theme);
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);
  const [primaryColor, setPrimaryColor] = useState("blue");

  const toggleColorScheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme, primaryColor: primaryColor }}
        withGlobalStyles
        withNormalizeCSS
      >
        <App primaryColor={primaryColor} setPrimaryColor={setPrimaryColor} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

//reportWebVitals();
