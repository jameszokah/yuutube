import React, { useState, useCallback, useEffect } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  ListItemIcon,
  MenuItem,
  Divider,
  Tooltip,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import {
  MenuOutlined,
  SearchOutlined,
  VideoCallOutlined,
  AppsOutlined,
  NotificationsOutlined,
  MicOutlined,
  SettingsOutlined,
  LogoutOutlined,
  Brightness3Outlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import YoutubeLogo from "../images/YouTube-name-wine.svg";
import YoutubeLogoDark from "../images/YouTube-white-wine.svg";
import { useAuth } from "../context/AuthContext";
import { useDarkTheme } from "../context/ThemeContext";
import "./Header.css";
import { auth } from "../utils/firebase";

const Header = () => {
  const [search, setSearch] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({});
  const { signInWithGoogle, setCurrentUser, signOutUser } = useAuth();
  const { state, dispatch } = useDarkTheme();

  const signIn = useCallback(async () => {
    try {
      const users = await signInWithGoogle();
      // setCurrentUser(users);
      setUser(users);
      setIsAuth(true);
      console.log(users);
    } catch (err) {
      console.log(err);
    }
  }, [signInWithGoogle]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOutUser();
      setCurrentUser({});
      setUser({});
      setIsAuth(false);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  }, [user, signOutUser]);

  const toggleDarkMode = () => {
    dispatch({ type: "TOGGLE_DARKMODE" });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (curUser) => {
      if (curUser) {
        setCurrentUser(curUser);
        setUser(curUser);
        setIsAuth(true);
        // console.log(curUser);
      } else {
        setCurrentUser({});
        setUser({});
        setIsAuth(false);
        // console.log(curUser);
      }
    });
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      className={`header ${state.darkMode && "dark-header"}`}
      style={{ backgroundColor: state.darkMode ? "#222" : "#fff" }}
    >
      <div className="header__left">
        <IconButton aria-label="menu" className="header__menu">
          <MenuOutlined />
        </IconButton>
        <Link to="/">
          <img
            src={state.darkMode ? YoutubeLogoDark : YoutubeLogo}
            alt="youtube-logo"
            className="header__logo"
          />
        </Link>
      </div>
      <div className="header__searchBox">
        <div
          className="header__input"
          style={{
            backgroundColor: state.darkMode && "#121212",
            color: state.darkMode && "#ffffffe0",
            border: state.darkMode && "0.3px solid #88888866",
          }}
        >
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ backgroundColor: state.darkMode && "#121212" }}
          />
          <Link to={`/search/${search}`} className="header__search">
            <div
              className="header__inputButton"
              style={{
                backgroundColor: state.darkMode && "#ffffff14",
                border: state.darkMode && "none",
              }}
            >
              <SearchOutlined className="search__iconButton" />
            </div>
          </Link>
        </div>
        <IconButton
          aria-label="mic"
          className="header__icon header__icon-disable"
        >
          <MicOutlined />
        </IconButton>
      </div>

      <div className="header__right">
        {isAuth ? (
          <IconButton
            aria-label="create video"
            className="header__icon header__icon-disable"
          >
            <VideoCallOutlined />
          </IconButton>
        ) : (
          ""
        )}
        <IconButton
          aria-label="apps"
          className="header__icon header__icon-disable"
        >
          <AppsOutlined />
        </IconButton>
        {isAuth ? (
          <IconButton
            aria-label="notification"
            className="header__icon header__icon-disable"
          >
            <NotificationsOutlined />
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
          <>
            <Tooltip title="Account settings">
              <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <Avatar
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="header__avatar"
                />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <ListItemIcon>
                  <Avatar
                    xs={{ width: "12", height: "12" }}
                    ls={{ width: "12", height: "12" }}
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />
                </ListItemIcon>
                My account
              </MenuItem>
              <MenuItem onClick={() => toggleDarkMode()}>
                <ListItemIcon>
                  <Brightness3Outlined />
                </ListItemIcon>
                Appearance: {state.darkMode ? "Light" : "Dark"}
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <SettingsOutlined fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => handleSignOut()}>
                <ListItemIcon>
                  <LogoutOutlined fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Header;






