import React from "react";

import { useQuery } from "react-query";
import youtube from "../../utils/youtube";
import VideoCard from "./VideoCard";
import "./RecommendedVideo.css";

const RecommendedVideo = () => {
  const { data, error, isLoading } = useQuery("videos", () =>
    youtube.get("videos", {
      params: {
        part: "snippet,contentDetails,statistics,player",
        chart: "mostPopular",
        maxWidth: 700,
        maxHeight: 350,
        maxResults: 50,
        // regionCode: "GH",
        key: "AIzaSyAKCNMuwfa4S0C5lPGFvl8W6FSasH-Pipc",
      },
    })
  );

  const skeletonData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  if (data) console.log(data);
  if (error) console.log(error);
  return (
    <div className="recommended__videos">
      <h2>Recommended</h2>
      <div className="recommended__videoContents">
        {isLoading &&
          skeletonData.map((skeleton) => <VideoCard key={skeleton} />)}
        {data &&
          data?.data?.items?.map(
            ({
              id,
              snippet: {
                title,
                channelTitle,
                description,
                thumbnails: { maxres },
              },
            }) =>
              maxres && (
                <VideoCard
                  key={id}
                  id={id}
                  title={title}
                  image={maxres.url ? maxres.url : ""}
                  views="15M views"
                  timestamp="2 years ago"
                  channel={channelTitle}
                  channelImage={maxres.url ? maxres.url : ""}
                />
              )
          )}

        {/* <VideoCard
          title="Experience the Underwater World Through the Eyes of a Free Diver"
          image="https://i.ytimg.com/vi/L4qM1IEhtNQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAFxENVHwI4HkGRXhYx9THNVdgVmw"
          views="15M views"
          timestamp="2 years ago"
          channel="National Geographic"
          channelImage="https://yt3.ggpht.com/ytc/AKedOLTdh4vj3oGXpCXT3lMqha9_Qq4-JvMBlpztnHvi_mI=s68-c-k-c0x00ffffff-no-rj"
        />
        <VideoCard
          title="Experience the Underwater World Through the Eyes of a Free Diver"
          image="https://i.ytimg.com/vi/L4qM1IEhtNQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAFxENVHwI4HkGRXhYx9THNVdgVmw"
          views="15M views"
          timestamp="2 years ago"
          channel="National Geographic"
          channelImage="https://yt3.ggpht.com/ytc/AKedOLTdh4vj3oGXpCXT3lMqha9_Qq4-JvMBlpztnHvi_mI=s68-c-k-c0x00ffffff-no-rj"
        /> */}
      </div>
    </div>
  );
};

export default RecommendedVideo;
