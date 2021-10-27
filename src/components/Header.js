import React, { useState, useCallback, useEffect } from "react";
import { Avatar, Button, IconButton } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import {
  MenuOutlined,
  SearchOutlined,
  VideoCallOutlined,
  AppsOutlined,
  NotificationsOutlined,
  MicOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import YoutubeLogo from "../images/YouTube-wine.svg";
import { useAuth } from "../context/AuthContext";
import "./Header.css";
import { auth } from "../utils/firebase";

const Header = () => {
  const [search, setSearch] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const { signInWithGoogle, setCurrentUser, currentUser } = useAuth();

  const signIn = useCallback(async () => {
    try {
      const users = await signInWithGoogle();
      setCurrentUser(users);
      setUser(users);
      setIsAuth(true);
      console.log(users);
    } catch (err) {
      console.log(err);
    }
  }, [setCurrentUser, signInWithGoogle]);

  useEffect(() => {
    onAuthStateChanged(auth, (curUser) => {
      setCurrentUser(curUser);
      setUser(curUser);
      setIsAuth(true);
      console.log(curUser);
    });
  });
  return (
    <div className="header">
      <div className="header__left">
        <IconButton aria-label="menu">
          <MenuOutlined />
        </IconButton>
        <Link to="/">
          <img src={YoutubeLogo} alt="youtube-logo" className="header__logo" />
        </Link>
      </div>
      <div className="header__searchBox">
        <div className="header__input">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to={`/search/${search}`} className="header__search">
            <div className="header__inputButton">
              <SearchOutlined className="search__iconButton" />
            </div>
          </Link>
        </div>
        <IconButton aria-label="mic">
          <MicOutlined className="header__icon" />
        </IconButton>
      </div>

      <div className="header__right">
        {isAuth ? (
          <IconButton aria-label="create video">
            <VideoCallOutlined className="header__icon" />
          </IconButton>
        ) : (
          ""
        )}
        <IconButton aria-label="apps">
          <AppsOutlined className="header__icon" />
        </IconButton>
        {isAuth ? (
          <IconButton aria-label="notification">
            <NotificationsOutlined className="header__icon" />
          </IconButton>
        ) : (
          <Button
            variant="outlined"
            startIcon={<Avatar className="header__signInAvatar" />}
            onClick={signIn}
            size="small"
          >
            Sign In
          </Button>
        )}
        {isAuth ? (
          <Avatar
            src={user?.photoURL}
            alt={user?.displayName}
            className="header__icon header__avatar"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Header;
