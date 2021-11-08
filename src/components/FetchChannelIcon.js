import { useQuery } from "react-query";
import youtube from "../utils/youtube";

const FetchChannelIcon = (channelId) => {
  const result = useQuery(
    ["thumbnail", channelId],
    async () =>
      channelId &&
      (await youtube.get("channels", {
        params: {
          part: "snippet,statistics",
          id: channelId,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      }))
  );

  return [{ ...result }];
};

export default FetchChannelIcon;
