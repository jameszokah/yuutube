import React from "react";

import { useQuery } from "react-query";
import youtube from "../../utils/youtube";
import { useDarkTheme } from "../../context/ThemeContext";
import CategoryBar from "../CategoryBar";
import VideoCard from "./VideoCard";
import "./RecommendedVideo.css";

const RecommendedVideo = () => {
  const { state } = useDarkTheme();
  const { data, error, isLoading } = useQuery(
    "videos",
    async () =>
      await youtube.get("videos", {
        params: {
          part: "snippet,contentDetails,statistics,player",
          chart: "mostPopular",
          maxWidth: 700,
          maxHeight: 350,
          maxResults: 50,
          // regionCode: "GH",
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      })
  );
      document.title = "YouTube | Clone";
      const skeletonData = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ];
      console.log(process.env);

 
      if (error) console.log(error);
      return (
        <div className="recommended__videos">
          <CategoryBar divider />

          <div
            className="recommended__videoContents"
            style={{ backgroundColor: state.darkMode && "#181818" }}
          >
            {isLoading &&
              skeletonData.map((skeleton) => <VideoCard key={skeleton} />)}
            {data &&
              data?.data?.items?.map(
                ({
                  id,
                  statistics: { viewCount },
                  snippet: {
                    channelId,
                    publishedAt,
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
                      channelId={channelId}
                      title={title}
                      image={maxres.url && maxres.url}
                      views={viewCount && viewCount}
                      timestamp={publishedAt}
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
