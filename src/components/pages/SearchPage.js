import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import youtube from "../../utils/youtube";
import { TuneOutlined } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useDarkTheme } from "../../context/ThemeContext";
import ChannelRow from "./ChannelRow";
import VideoRow from "./VideoRow";

import "./SearchPage.css";

const SearchPage = () => {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const { state } = useDarkTheme();
  const { isLoading, data, error } = useQuery(
    ["search", searchTerm],
    async () =>
      await youtube.get("search", {
        params: {
          part: "snippet",
          maxResults: 50,
          key: "AIzaSyAKCNMuwfa4S0C5lPGFvl8W6FSasH-Pipc",
          q: searchTerm,
          type: "video,channel,playlist",
        },
      })
  );

  useEffect(() => {
    if (data) setSearchResults(data?.data?.items);
  }, [searchResults, data, searchTerm]);

  const skeletonData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (data) console.log(data);
  if (error) console.log(error);
  let disAbleHr = null;

  return (
    <div
      className={`searchPage ${state.darkMode && "dark-searchPage"}`}
      style={{ backgroundColor: state.darkMode && "#181818" }}
    >
      <div className="searchPage__filter">
        <TuneOutlined />
        <h2 style={{ color: state.darkMode && "#ffffff" }}>Filters</h2>
      </div>
      <hr />
      <div className="searchPage__channelRow">
        {isLoading && <ChannelRow />}
        {searchResults &&
          searchResults.map(
            (
              {
                id: { kind, videoId },
                snippet: {
                  title,
                  description,
                  channelId,
                  channelTitle,
                  thumbnails: {
                    high: { url },
                  },
                },
              },
              i
            ) =>
              kind === "youtube#channel" ? (
                <ChannelRow
                  key={videoId}
                  id={videoId}
                  image={url}
                  channel={channelTitle}
                  channelId={channelId}
                  subs="896K"
                  verified
                  numOfVideos={427}
                  description={description}
                />
              ) : (
                (disAbleHr = true)
              )
          )}
      </div>
      <hr style={{ display: disAbleHr && "none" }} />
      <h3>Latest from {searchTerm}</h3>
      <div className="searchPage__videoRow">
        {isLoading &&
          skeletonData.map((skeleton) => <VideoRow key={skeleton} />)}
        {searchResults &&
          searchResults.map(
            ({
              id: { kind, videoId },
              snippet: {
                title,
                description,
                channelId,
                channelTitle,
                thumbnails: {
                  high: { url },
                },
                publishedAt,
              },
            }) =>
              kind === "youtube#video" ? (
                <VideoRow
                  key={videoId}
                  id={videoId}
                  thumbnail={url}
                  channelId={channelId}
                  image={url}
                  description={description}
                  title={title}
                  channel={channelTitle}
                  timestamp={publishedAt}
                />
              ) : (
                ""
              )
          )}
      </div>
    </div>
  );
};

export default SearchPage;
