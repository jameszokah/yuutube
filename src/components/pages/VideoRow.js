import React from "react";
import { Avatar } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import "./VideoRow.css";

const VideoRow = ({
  id,
  image,
  title,
  views,
  subs,
  description,
  timestamp,
  channel,
  thumbnail,
}) => {
  return (
    <div className="videoRow">
      <div className="videoRow__thumbnail">
        {image ? (
          <Link to={`/watch/${id}`} className="videoRow__link">
            <img src={thumbnail} alt={channel} />
          </Link>
        ) : (
          <Skeleton height={147} />
        )}
      </div>
      <Link to={`/watch/${id}`} className="videoRow__link">
        <div className="videoRow__text">
          <h3>{title || <Skeleton />}</h3>
          <p className="videoRow__headline">
            <span className="videoRow__views">{subs || <Skeleton />}</span>{" "}
            subscribers . {views || <Skeleton />}
            views {timestamp || <Skeleton />}
          </p>
          <div className="videoRow__channel">
            <Avatar className="videoRow__avatar" src={image} alt="" />
            <p>{channel || <Skeleton />}</p>
          </div>
          <p className="videoRow__description">{description || <Skeleton />}</p>
        </div>
      </Link>
    </div>
  );
};

export default VideoRow;
