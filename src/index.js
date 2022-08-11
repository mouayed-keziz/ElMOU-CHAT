import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Landing from "./Pages/Landing";
import reportWebVitals from "./reportWebVitals";
import { useColorScheme } from "@mantine/hooks";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Footer from "./Components/Footer";
import NavigationBar from "./Components/NavigationBar";
import ChatRoom from "./Pages/ChatRoom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApplicationRoutingAndThemeManager />
  </React.StrictMode>
);

function ApplicationRoutingAndThemeManager() {
  const preferredColorScheme = useColorScheme("dark");
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);
  const toggleColorScheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Router>
          <NavigationBar />
          <Routes>
            <Route path={"/"} element={<Landing />} />
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
