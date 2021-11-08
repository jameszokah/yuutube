import React, { useState, useEffect } from "react";
import millify from "millify";
import { Avatar, Button, IconButton } from "@mui/material";
import {
  MoreHorizOutlined,
  NotificationsOutlined,
  PlaylistAddOutlined,
  ShareOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import { useQueries } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import youtube from "../../utils/youtube";
import { useParams } from "react-router-dom";
import ResponsiveEmbed from "react-responsive-embed";
import Skeleton from "react-loading-skeleton";
import CategoryBar from "../CategoryBar";
import RelatedVideo from "./RelatedVideo";
import useChannelIcon from "../FetchChannelIcon";
import { useDarkTheme } from "../../context/ThemeContext";
import "react-loading-skeleton/dist/skeleton.css";
import "./Watch.css";

const Watch = () => {
  const [showMore, setShowMore] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [relatedToVideoData, setRelatedToVideoData] = useState([]);
  const { videoId } = useParams();
  const { state } = useDarkTheme();
  const [
    { data, isLoading, isError, error },
    {
      data: relatedTo,
      isLoading: reletedVideoLoading,
      error: relatedToError,
      isError: isRelatedError,
    },
  ] = useQueries([
    {
      queryKey: ["video", videoId, 1],
      queryFn: async () =>
        videoId &&
        (await youtube.get("videos", {
          params: {
            part: "snippet,contentDetails,statistics",
            id: videoId,
            key: "AIzaSyAKCNMuwfa4S0C5lPGFvl8W6FSasH-Pipc",
          },
        })),
      refetchOnReconnect: "always",
      refetchOnMount: true,
    },
    {
      queryKey: ["search", videoId, 2],
      queryFn: async () =>
        videoId &&
        (await youtube.get("search", {
          params: {
            part: "snippet",
            relatedToVideoId: videoId,
            type: "video",
            maxResults: 30,
            key: "AIzaSyAKCNMuwfa4S0C5lPGFvl8W6FSasH-Pipc",
          },
        })),
      refetchOnReconnect: "always",
      refetchOnMount: true,
    },
  ]);

  // const = useQuery(
  //   "video",
  //   async () =>
  //     await youtube.get("videos", {
  //       params: {
  //         part: "snippet,contentDetails,statistics",
  //         id: videoId,
  //         key: "AIzaSyAKCNMuwfa4S0C5lPGFvl8W6FSasH-Pipc",
  //       },
  //     })
  // );

  // const  = useQuery(
  //   "search",
  //   async () =>
  //     videoId &&
  //     (await youtube.get("search", {
  //       params: {
  //         part: "snippet",
  //         relatedToVideoId: videoId,
  //         type: "video",
  //         maxResults: 30,
  //         key: "AIzaSyAKCNMuwfa4S0C5lPGFvl8W6FSasH-Pipc",
  //       },
  //     }))
  // );

  // useEffect(() => {
  //   setVideoData((prevData) => [...prevData, ...data?.data?.items]);
  //   setRelatedToVideoData((prevRelatedTo) => [
  //     ...prevRelatedTo,
  //     ...relatedTo?.data?.items,
  //   ]);
  //   return () => {
  //     setVideoData([]);
  //     setRelatedToVideoData([])
  //   };
  // }, [data?.data?.items, relatedTo?.data?.items]);

  // useEffect(() => {
  //   // console.log(relatedToVideoData);

  //   // return () => {
  //   //   setRelatedToVideoData([]);
  //   // };
  // }, [relatedTo?.data?.items]);

  // useEffect(() => {
  //   youtube
  //     .get("search", {
  //       params: {
  //         part: "snippet",
  //         relatedToVideoId: videoId,
  //         type: "video",
  //         maxResults: 30,
  //         key: "AIzaSyAKCNMuwfa4S0C5lPGFvl8W6FSasH-Pipc",
  //       },
  //     })
  //     .then((res) => setRelatedToVideoData([...res?.data?.items]))
  //     .catch((err) => console.log(err));
  // }, [videoId]);

  // const {
  //   snippet: {
  //     description,
  //     title,
  //     channelTitle,
  //     thumbnails: {
  //       maxres: { url },
  //     },
  //   },
  // } = videoData.kind === "youtube#video" && videoData;

  const [{ data: channelData }] = useChannelIcon(
    data?.data.items[0]?.snippet?.channelId
  );
  data && console.log("channel ICON", data);

  if (data && relatedTo) console.log(data, relatedTo);
  if (isError) console.log(error);
  if (isRelatedError) console.log(relatedToError);
  return (
    <div
      className={`watch ${state.darkMode && "dark-watch"}`}
      style={{ backgroundColor: state.darkMode && "#181818" }}
    >
      <div className="watch__player">
        <ResponsiveEmbed
          className="watch__iframe"
          // title={videoData[0]?.snippet?.title}
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
          // srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${videoId}?autoplay=1><img src=${videoData[0]?.snippet?.thumbnails?.maxres?.url} alt=${videoData[0]?.snippet?.title}><span>▶</span></a>`}
        ></ResponsiveEmbed>
        {data?.data?.items &&
          data?.data?.items.map(
            (
              {
                id,
                snippet: {
                  description,
                  title,
                  publishedAt,
                  channelTitle,
                  thumbnails: {
                    standard: { url },
                  },
                },
                statistics: { viewCount, likeCount, dislikeCount },
              },
              i
            ) => {
              if (id === videoId) {
                document.title = title;
                const channelInfo = channelData && channelData?.data?.items[i];
                console.log(channelInfo);
                return (
                  <>
                    <div key={id} className="watch__headline">
                      <h2 className="watch__title">
                        {title || <Skeleton width={120} count={2} />}
                      </h2>
                      <div className="watch__actions">
                        <p className="watch__views">{`${viewCount} views . ${new Date(
                          publishedAt
                        )
                          .toDateString()
                          .slice(4)} `}</p>
                        <div className="watch__actionItem">
                          <div className="thumbs__border">
                            <div className="watch__likeItem">
                              <IconButton aria-label="thumbsup">
                                <ThumbUpOutlined className="watch__likeItemIcon" />
                              </IconButton>
                              <h4>{millify(likeCount)}</h4>
                            </div>
                            <div className="watch__likeItem">
                              <IconButton aria-label="thumbsdown">
                                <ThumbDownOutlined className="watch__likeItemIcon" />
                              </IconButton>

                              <h4>{millify(dislikeCount)}</h4>
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
                        {url ? (
                          <Avatar
                            src={
                              channelInfo &&
                              (channelInfo?.snippet?.thumbnails?.high.url || url)
                            }
                            alt={channelTitle}
                            className="watch__channelAvatar"
                          />
                        ) : (
                          <Skeleton width={80} height={80} circle />
                        )}

                        <div className="watch__channelText">
                          <h4>{url && channelTitle}</h4>
                          <p>
                            {channelInfo &&
                              millify(
                                channelInfo?.statistics?.subscriberCount
                              )}{" "}
                            subscribers
                          </p>
                        </div>
                      </div>
                      <div className="watch__subscribe">
                        {url ? (
                          <Button
                            variant="contained"
                            color="error"
                            className="watch__subscribeButton"
                          >
                            SUBSCRIBE
                          </Button>
                        ) : (
                          <Skeleton width={50} />
                        )}
                        {url ? (
                          <IconButton aria-label="notification">
                            <NotificationsOutlined />
                          </IconButton>
                        ) : (
                          <Skeleton width={50} />
                        )}
                      </div>
                    </div>
                    <div className="watch__videoDescription">
                      <p>
                        {showMore
                          ? description && description
                          : (description &&
                              `${description.substring(0, 100)}...`) || (
                              <Skeleton width={100} count={3} />
                            )}
                      </p>

                      <div>
                        <Button
                          variant="text"
                          color="primary"
                          className="watch__showMore"
                          onClick={() => setShowMore(!showMore)}
                        >
                          {showMore ? "SHOW LESS" : "SHOW MORE"}
                        </Button>
                      </div>
                    </div>
                  </>
                );
              }
            }
          )}

        <hr />
      </div>
      <div className="watch__relatedVideos">
        {relatedTo?.data?.items ? (
          <>
            <CategoryBar divider={false} />
            {relatedTo?.data?.items.map(
              (video) =>
                video.snippet &&
                (video.snippet.thumbnails.high.url ||
                  videoData[0]?.snippet?.thumbnails?.standard?.url) && (
                  <RelatedVideo
                    videoId={video?.id?.videoId}
                    title={video?.snippet?.title}
                    image={video?.snippet?.thumbnails?.high?.url}
                    channel={video?.snippet?.channelTitle}
                    views=""
                    timestamp={video?.snippet?.publishedAt}
                  />
                )
            )}
          </>
        ) : (
          console.log(relatedTo)
        )}
      </div>
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </div>
  );
};

export default Watch;
