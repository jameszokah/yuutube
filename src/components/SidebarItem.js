import React from "react";
import { useDarkTheme } from "../context/ThemeContext";
import "./SidebarItem.css";

const SidebarItem = ({ title, Icon }) => {
  const { state } = useDarkTheme();

  return (
    <div className={`sidebar__item ${state.darkMode && "dark-sidebar__item"}`}>
      <Icon className="sidebar__icon" />
      <h2
        className="sidebar__title"
        style={{
          color: state.darkMode && "#ffffffe0",
        }}
      >
        {title}
      </h2>
    </div>
  );
};

export default SidebarItem;
