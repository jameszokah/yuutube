import React from "react";
import { useDarkTheme } from "../context/ThemeContext";
import "./ExploreCard.css";

export const ExploreCard = ({ title, icon }) => {
  const {
    state: { darkMode },
  } = useDarkTheme();

  return (
    <div className={`explore__card ${darkMode && "dark__cardExplore"}`}>
      <div className="explore__cardIcon">
        <img src={icon} alt={title} />
      </div>
      <h4
        style={{
          color: darkMode ? "#fff" : "#000",
          fontWeight: "400",
          paddingTop: "5px",
        }}
      >
        {title}
      </h4>
    </div>
  );
};

export default ExploreCard;
