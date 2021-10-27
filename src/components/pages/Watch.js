import React from "react";
import { Avatar, Button, IconButton } from "@mui/material";
import {
  MoreHorizOutlined,
  NotificationsOutlined,
  PlaylistAddOutlined,
  ShareOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import ResponsiveEmbed from "react-responsive-embed";
import RelatedVideo from "./RelatedVideo";
import "./Watch.css";

const Watch = () => {
  const { videoId } = useParams();
  return (
    <div className="watch">
      <div className="watch__player">
        <ResponsiveEmbed
          title={videoId}
          src={`https://www.youtube.com/embed/${videoId}`}
        ></ResponsiveEmbed>
        <div className="watch__headline">
          <h2 className="watch__title">Hello People</h2>
          <div className="watch__actions">
            <p className="watch__views">11K views</p>
            <div className="watch__actionItem">
              <div className="thumbs__border">
                <div className="watch__likeItem">
                  <IconButton aria-label="thumbsup">
                    <ThumbUpOutlined className="watch__likeItemIcon" />
                  </IconButton>
                  <h4>{432}</h4>
                </div>
                <div className="watch__likeItem">
                  <IconButton aria-label="thumbsdown">
                    <ThumbDownOutlined className="watch__likeItemIcon" />
                  </IconButton>

                  <h4>{12}</h4>
                </div>
              </div>
              <div className="watch__likeItem">
                <IconButton aria-label="share">
                  <ShareOutlined className="watch__likeItemIcon" />
                </IconButton>
                <h4>SHARE</h4>
              </div>
              <div className="watch__likeItem">
                <IconButton aria-label="add to playlist">
                  <PlaylistAddOutlined className="watch__likeItemIcon" />
                </IconButton>
                <h4>SAVE</h4>
              </div>
              <div className="watch__likeItem">
                <IconButton aria-label="show more">
                  <MoreHorizOutlined />
                </IconButton>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div className="watch__channelDescription">
          <div className="watch__channelInfo">
            <Avatar src="" alt="" className="watch__channelAvatar" />
            <div className="watch__channelText">
              <h4>James Zokah</h4>
              <p>1.03M subscribers</p>
            </div>
          </div>
          <div className="watch__subscribe">
            <Button
              variant="contained"
              color="error"
              className="watch__subscribeButton"
            >
              SUBSCRIBE
            </Button>
            <IconButton aria-label="notification">
              <NotificationsOutlined />
            </IconButton>
          </div>
        </div>
        <div className="watch__videoDescription">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            maiores quos qui vitae.
          </p>
          <div>
            <h5>SHOW MORE</h5>
          </div>
        </div>
        <hr />
      </div>
      <div className="watch__relatedVideos">
        <RelatedVideo
          title="Flash the incredible movie"
          channel="James Zokah"
          views="122M"
          timestamp="7 months ago"
        />
      </div>
    </div>
  );
};

export default Watch;
