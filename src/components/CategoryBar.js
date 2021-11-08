import React, { useState } from "react";
import { useDarkTheme } from "../context/ThemeContext";
import "./CategoryBar.css";

const CategoryBar = ({ divider }) => {
  const { state } = useDarkTheme();
  const keywords = [
    "All",
    "ReactJs",
    "Flutter",
    "Sports",
    "live",
    "Music",
    "Games",
    "Javascript",
    "Python",
    "Redux",
    "Linux",
    "Editing",
    "Computers",
    "Playlist",
    "Sales",
  ];
  const [toggleActive, setToggleActive] = useState(keywords[0]);

  const handleClick = (value) => {
    setToggleActive(value);
  };
  return (
    <div
      className={`categorybarWrapper ${divider ? "" : "divider"}`}
      style={{
        backgroundColor: state.darkMode && "#202020",
        borderTop: state.darkMode && "0.3px solid #373737",
        borderBottom: state.darkMode && "0.3px solid #373737",
      }}
    >
      <div
        className="categorybar"
        style={{ backgroundColor: state.darkMode && "#202020" }}
      >
        {keywords.map((value, i) => (
          <span
            key={i}
            className={`categorybar__item  ${
              toggleActive === value ? "active" : ""
            } ${state.darkMode && "dark-active"}`}
            style={{
              backgroundColor: state.darkMode && "#4d4d4d",
              color: state.darkMode && "#fff",
            }}
            onClick={() => handleClick(value)}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
