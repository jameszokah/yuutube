import React from "react";
import {
  HomeOutlined,
  ExploreOutlined,
  SubscriptionsOutlined,
  VideoLibraryOutlined,
  HistoryOutlined,
  OndemandVideoOutlined,
  WatchLaterOutlined,
  ThumbUpAltOutlined,
  ExpandMoreOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/" exact className="sidebar__link">
        <SidebarItem Icon={HomeOutlined} title="Home" />
      </NavLink>
      <NavLink to="/explore" exact className="sidebar__link">
        <SidebarItem Icon={ExploreOutlined} title="Explore" />
      </NavLink>
      <NavLink to="/subscriptions" exact className="sidebar__link">
        <SidebarItem Icon={SubscriptionsOutlined} title="Subscriptions" />
      </NavLink>
      <hr />
      <NavLink to="/library" exact className="sidebar__link">
        <SidebarItem Icon={VideoLibraryOutlined} title="Library" />
      </NavLink>
      <NavLink to="/history" exact className="sidebar__link">
        <SidebarItem Icon={HistoryOutlined} title="History" />
      </NavLink>
      <NavLink to="/yourvideos" exact className="sidebar__link">
        <SidebarItem Icon={OndemandVideoOutlined} title="Your Videos" />
      </NavLink>
      <NavLink to="/watchlater" exact className="sidebar__link">
        <SidebarItem Icon={WatchLaterOutlined} title="Watch Later" />
      </NavLink>
      <NavLink to="/likes" exact className="sidebar__link">
        <SidebarItem Icon={ThumbUpAltOutlined} title="Likes Videos" />
      </NavLink>
      <NavLink to="/more" exact className="sidebar__link">
        <SidebarItem Icon={ExpandMoreOutlined} title="Show More" />
      </NavLink>
      <hr />
    </div>
  );
};

export default Sidebar;
