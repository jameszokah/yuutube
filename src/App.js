import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import RecommendedVideo from "./components/pages/RecommendedVideo";
import SearchPage from "./components/pages/SearchPage";
import Explore from "./components/pages/Explore";
import Subscriptions from "./components/pages/Subscriptions";
import Watch from "./components/pages/Watch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDarkTheme } from "./context/ThemeContext";
import DarkSkeleton from "./components/pages/DarkSkeleton";
import "./App.css";

function App() {
  const { state } = useDarkTheme();

  const darkTheme = createTheme({
    palette: {
      mode: state.darkMode ? "dark" : "light",
    },
  });

  return (
    <div
      className="app"
      style={{ backgroundColor: state.darkMode && "#181818" }}
    >
      <ThemeProvider theme={darkTheme}>
        <DarkSkeleton>
          {/* Header.js */}
          <Header />

          <Switch>
            <Route exact path="/">
              <div className="app__pages">
                <Sidebar />
                <RecommendedVideo />
              </div>
            </Route>
            <Route exact path="/search/:searchTerm">
              <div className="app__pages">
                <Sidebar />

                <SearchPage />
              </div>
            </Route>
            <Route exact path="/explore">
              <div className="app__pages">
                <Sidebar />
                <Explore />
              </div>
            </Route>
            <Route exact path="/subscriptions">
              <div className="app__pages">
                <Sidebar />
                <Subscriptions />
              </div>
            </Route>
            <Route exact path="/watch/:videoId" children={<Watch />} />
          </Switch>

          {/* Sidebar */}
          {/* Recommendered */}
        </DarkSkeleton>
      </ThemeProvider>
    </div>
  );
}

export default App;
