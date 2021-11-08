import React from "react";

import { useQuery } from "react-query";
import youtube from "../../utils/youtube";
import { useDarkTheme } from "../../context/ThemeContext";
import VideoRow from "./VideoRow";
import ExploreCard from "../ExploreCard";
import "./Explore.css";

const Explore = () => {
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
          regionCode: "GH",
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      })
  );

  const skeletonData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


  if (error) console.log(error);
  return (
    <div
      className="explore__videos"
      style={{ backgroundColor: state.darkMode ? "#181818" : "#f9f9f9" }}
    >
      <div className="explore__cardWrapper">
        <ExploreCard
          title="Trending"
          icon="https://youtube.com/img/explore/destinations/icons/trending_color_32.png"
        />
        <ExploreCard
          title="Music"
          icon="https://youtube.com/img/explore/destinations/icons/music_color_32.png"
        />
        <ExploreCard
          title="Gaming"
          icon="https://youtube.com/img/explore/destinations/icons/gaming_color_32.png"
        />
        <ExploreCard
          title="Sports"
          icon="https://youtube.com/img/explore/destinations/icons/sports_color_32.png"
        />
      </div>
      <h4
        style={{
          color: state.darkMode && "#fff",
          fontWeight: "400",
          paddingBottom: "20px",
        }}
      >
        Trending Videos
      </h4>
      <div
        className="explore__videoContents"
        style={{ backgroundColor: state.darkMode && "#181818" }}
      >
        {isLoading &&
          skeletonData.map((skeleton) => <VideoRow key={skeleton} />)}
        {data &&
          data?.data?.items?.map(
            ({
              id,
              statistics: { viewCount },
              snippet: {
                publishedAt,
                title,
                channelTitle,
                description,
                thumbnails: { maxres },
              },
            }) =>
              maxres && (
                <VideoRow
                  key={id}
                  id={id}
                  title={title}
                  image={maxres?.url && maxres?.url}
                  thumbnail={maxres?.url && maxres?.url}
                  description={description}
                  views={viewCount && viewCount}
                  timestamp={publishedAt}
                  channel={channelTitle}
                  explore
                />
              )
          )}
      </div>
    </div>
  );
};

export default Explore;
