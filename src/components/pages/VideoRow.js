import React from "react";
import { Avatar } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import millify from "millify";
import useChannelIcon from "../FetchChannelIcon";
import useShortenTitle from "../ShortenTitle";
import { useDarkTheme } from "../../context/ThemeContext";
import "react-loading-skeleton/dist/skeleton.css";
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
  channelId,
  thumbnail,
  explore,
}) => {
  const { shortTitle } = useShortenTitle();
  const { state } = useDarkTheme();
  const [{ data }] = useChannelIcon(channelId);

  const channelInfo = data && data?.data?.items[0];
  data && console.log(data);

  return (
    <div className="videoRow">
      <div
        className="videoRow__thumbnail"
        style={{ width: explore && "246px", height: explore && "138px" }}
      >
        {image ? (
          <Link to={`/watch/${id}`} className="videoRow__link">
            <img src={thumbnail} alt={channel} />
          </Link>
        ) : (
          <Skeleton height={147} width={270} />
        )}
      </div>
      <Link to={`/watch/${id}`} className="videoRow__link">
        <div className="videoRow__text">
          <h3
            style={{
              color: state.darkMode && "#ffffff",
              fontSize: explore && "1em",
              fontWeight: explore && "400",
            }}
          >
            {title || <Skeleton width={210} />}
          </h3>
          <p
            className="videoRow__headline"
            style={{ color: state.darkMode && "#ffffff6c" }}
          >
            {!explore && data && millify(channelInfo?.statistics?.viewCount)}
            {!explore && data && " views . "}
            {<TimeAgo date={new Date(timestamp)} /> || <Skeleton width={70} />}
          </p>
          <div className="videoRow__channel">
            {!explore &&
              image &&
              ((
                <Avatar
                  className="videoRow__avatar"
                  src={
                    (data && channelInfo?.snippet?.thumbnails?.medium?.url) ||
                    image
                  }
                  alt=""
                />
              ) || <Skeleton circle width={30} height={30} />)}
            <p style={{ color: state.darkMode && "#ffffff6c" }}>
              {channel || <Skeleton width={100} />}{" "}
            </p>
          </div>

          <p
            className="videoRow__description"
            style={{ color: state.darkMode && "#ffffff6c" }}
          >
            {shortTitle(description, 120, title) || <Skeleton width={300} />}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default VideoRow;
