import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import RecommendedVideo from "./components/pages/RecommendedVideo";
import SearchPage from "./components/pages/SearchPage";
import Explore from "./components/pages/Explore";
import Subscriptions from "./components/pages/Subscriptions";
import Watch from "./components/pages/Watch";
import "./App.css";

function App() {
  return (
    <div className="app">
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
    </div>
  );
}

export default App;
