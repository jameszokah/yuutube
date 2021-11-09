import React from "react";
import millify from "millify";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import { useDarkTheme } from "../../context/ThemeContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useChannelIcon from "../FetchChannelIcon";
import DarkSkeleton from "./DarkSkeleton";
import "./VideoCard.css";
import { AccessTimeOutlined, PlaylistPlayOutlined } from "@mui/icons-material";

const VideoCard = ({
  id,
  image,
  title,
  channelId,
  channel,
  views,
  timestamp,
  channelImage,
}) => {
  const { state } = useDarkTheme();
  const [{ data }] = useChannelIcon(channelId);

  const thumbnail =
    data &&
    data?.data?.items?.map((thumb) => thumb?.snippet?.thumbnails?.high?.url)[0];
 
  return (
    <DarkSkeleton>
      <div className={`videoCard ${state.darkMode && "dark-videoCard"}`}>
        {image ? (
          <Link
            to={`/watch/${id}`}
            className="videoCard__link videoCard__hover"
          >
            <img src={image} alt="" className="videoCard__thumbnail" />
          </Link>
        ) : (
          <Skeleton height={162} className="videoCard__thumbnail" />
        )}

        <div className="videoCard__info">
          {channelImage ? (
            <Avatar
              src={thumbnail || image}
              alt={channel}
              className="videoCard__avatar"
            />
          ) : (
            <Skeleton width={40} height={40} circle />
          )}

          <Link to={`/watch/${id}`} className="videoCard__link">
            <div className="videoCard__text">
              <h4>{title || <Skeleton width={200} count={2} />}</h4>
              <p>{channel || <Skeleton width={100} />}</p>
              <p>
                {views && `${millify(Number(views))} views `}.{" "}
                {timestamp && <TimeAgo date={new Date(timestamp)} />}
              </p>
            </div>
          </Link>
          <div className="hover__button">
            <Button
              style={{
                backgroundColor: state.darkMode ? "#3B3B3B" : "lightgrey",
                color: state.darkMode ? "#AAAAAA" : "#000",
                margin: "6px auto",
                width: "100%",
                paddingLeft: "18px",
                paddingRight: "18px",
              }}
              variant="contained"
              size="medium"
            >
              <AccessTimeOutlined /> {"  Watch Later"}
            </Button>
            <Button
              style={{
                backgroundColor: state.darkMode ? "#3B3B3B" : "lightgrey",
                color: state.darkMode ? "#AAAAAA" : "#000",
                margin: "6px auto",
                width: "100%",
                paddingLeft: "18px",
                paddingRight: "18px",
              }}
              variant="contained"
              size="medium"
            >
              <PlaylistPlayOutlined /> {"  Add To Queue"}
            </Button>
          </div>
        </div>
      </div>
    </DarkSkeleton>
  );
};

export default VideoCard;
