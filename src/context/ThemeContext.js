import React, { createContext, useReducer, useContext } from "react";
import AuthContextProvider from "./AuthContext";

export const ThemeContext = createContext({
  state: {},
  dispatch: () => {},
});

let INIT_STATE;

if (localStorage && localStorage.getItem("darkMode")) {
  INIT_STATE = {
    darkMode: JSON.parse(localStorage.getItem("darkMode")),
  };
} else {
  INIT_STATE = {
    darkMode: false,
  };
}

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_DARKMODE":
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, INIT_STATE);
  localStorage &&
    localStorage.setItem("darkMode", JSON.stringify(state.darkMode));

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useDarkTheme = () => useContext(ThemeContext);
