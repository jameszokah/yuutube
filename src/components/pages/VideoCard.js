import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./VideoCard.css";

const VideoCard = ({
  id,
  image,
  title,
  channel,
  views,
  timestamp,
  channelImage,
}) => {
  return (
    <div className="videoCard">
      {image ? (
        <Link to={`/watch/${id}`} className="videoCard__link">
          <img src={image} alt="" className="videoCard__thumbnail" />
        </Link>
      ) : (
        <Skeleton height={162} className="videoCard__thumbnail" />
      )}

      <div className="videoCard__info">
        {channelImage ? (
          <Avatar
            src={channelImage}
            alt={channel}
            className="videoCard__avatar"
          />
        ) : (
          <Skeleton width={40} height={40} circle />
        )}

        <Link to={`/watch/${id}`} className="videoCard__link">
          <div className="videoCard__text">
            <h4>{title || <Skeleton width={150} count={2} />}</h4>
            <p>{channel || <Skeleton width={80} />}</p>
            <p>
              {views || <Skeleton width={20} />}. {timestamp}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VideoCard;
