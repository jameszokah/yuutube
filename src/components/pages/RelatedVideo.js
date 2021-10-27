import React from "react";
import { Link } from "react-router-dom";
import "./RelatedVideo.css";

const RelatedVideo = ({ image, title, channel, views, timestamp, videoId }) => {
  return (
    <div className="relatedVideo">
      <div className="relatedVideo__thumbnail">
        <Link to={`/watch/${videoId}`} className="relatedVideo__link">
          <img src={image} alt={channel} />
        </Link>
      </div>
      <Link to={`/watch/${videoId}`} className="relatedVideo__link">
        <div className="relatedVideo__text">
          <h4 className="relatedVideo__title">{title}</h4>
          <p>{channel}</p>
          <p>
            {views} views . {timestamp}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default RelatedVideo;
