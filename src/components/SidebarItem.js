import React from "react";
import "./SidebarItem.css";

const SidebarItem = ({ title, Icon }) => {
  return (
    <div className="sidebar__item">
      <Icon className="sidebar__icon" />
      <h2 className="sidebar__title">{title}</h2>
    </div>
  );
};

export default SidebarItem;
