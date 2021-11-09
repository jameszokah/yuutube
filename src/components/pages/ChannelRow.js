import React from "react";
import millify from "millify";
import { Avatar, Button, IconButton } from "@mui/material";
import { NotificationsOutlined } from "@mui/icons-material";
import { useDarkTheme } from "../../context/ThemeContext";
import useChannelIcon from "../FetchChannelIcon";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./ChannelRow.css";

const ChannelRow = ({
  image,
  channel,
  channelId,
  verified,
  subs,
  numOfVideos,
  description,
  i,
}) => {
  const { state } = useDarkTheme();
  const [{ data }] = useChannelIcon(channelId);

  const channelInfo = data && data?.data?.items[0];

  return (
    <div className="channelRow">
      {image ? (
        <Avatar src={image} alt={channel} className="channelRow__logo" />
      ) : (
        <Skeleton width={160} height={160} circle />
      )}
      <div className="channelRow__text">
        <h4
          style={{
            color: state.darkMode && "#ffffff",
          }}
        >
          {channel || <Skeleton />}
        </h4>
        <p
          style={{
            color: state.darkMode && "#ffffff",
          }}
        >
          {(data &&
            `${millify(
              channelInfo?.statistics?.subscriberCount
            )}  subscribers . ${
              channelInfo?.statistics?.videoCount
            } videos`) || <Skeleton width={160} />}
        </p>
        <p
          style={{
            color: state.darkMode && "#ffffff",
          }}
        >
          {description || <Skeleton width={160} />}
        </p>
      </div>
      {data && <Button
        variant="contained"
        color="error"
        className="channelRow__subscribeButton"
      >
        SUBSCRIBE
      </Button>}
      {data && <IconButton>
        <NotificationsOutlined className="channelRow__notification" />
      </IconButton>}
    </div>
  );
};

export default ChannelRow;
