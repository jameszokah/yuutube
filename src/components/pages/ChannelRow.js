import React from "react";
import { Avatar, Button } from "@mui/material";
import { NotificationsOutlined } from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ChannelRow.css";

const ChannelRow = ({
  image,
  channel,
  verified,
  subs,
  numOfVideos,
  description,
}) => {
  return (
    <div className="channelRow">
      {image ? (
        <Avatar src={image} alt={channel} className="channelRow__logo" />
      ) : (
        <Skeleton width={200} height={200} circle />
      )}
      <div className="channelRow__text">
        <h4>{channel || <Skeleton />}</h4>
        <p>
          {subs || <Skeleton />} subscribers . {numOfVideos || <Skeleton />}
          videos
        </p>
        <p>{description || <Skeleton />}</p>
      </div>
      <Button
        variant="contained"
        color="error"
        className="channelRow__subscribeButton"
      >
        SUBSCRIBE
      </Button>
      <NotificationsOutlined className="channelRow__notification" />
    </div>
  );
};

export default ChannelRow;
