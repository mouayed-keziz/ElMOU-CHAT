import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import "./index.css";
import ChatRoom from "./Pages/ChatRoom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApplicationRoutingAndThemeManager />
  </React.StrictMode>
);

function ApplicationRoutingAndThemeManager() {
  const preferredColorScheme = useColorScheme("dark");
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
        <Router>
          {
            <NavigationBar
              primaryColor={primaryColor}
              primaryColorHandeler={setPrimaryColor}
            />
          }
          <Routes>
            <Route path={"/"} element={<Landing color={primaryColor} />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/chat"} element={<ChatRoom />} />
          </Routes>
          {/*<Footer />*/}
        </Router>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

reportWebVitals();
