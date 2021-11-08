import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDarkTheme } from "../../context/ThemeContext";
import "./RelatedVideo.css";

const RelatedVideo = ({ image, title, channel, views, timestamp, videoId }) => {
  const { state } = useDarkTheme();

  return (
    <div className="relatedVideo">
      <div className="relatedVideo__thumbnail">
        {image ? (
          <Link
            to={`/watch/${videoId}`}
            className="relatedVideo__link"
          >
            <img src={image ? image : ""} alt={channel} />
          </Link>
        ) : (
          <Skeleton height={130} />
        )}
      </div>
      <Link
        to={`/watch/${videoId}`}
        className="relatedVideo__link"
      >
        <div className="relatedVideo__text">
          <h4
            className="relatedVideo__title"
            style={{ color: state.darkMode && "#ffffff" }}
          >
            {title ? title : <Skeleton />}
          </h4>
          <p>{channel ? channel : <Skeleton />}</p>
          <p>
            {views} <TimeAgo date={new Date(timestamp)} />
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RelatedVideo;
