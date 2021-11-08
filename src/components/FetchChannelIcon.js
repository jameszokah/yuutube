import { useQuery } from "react-query";
import youtube from "../utils/youtube";

const key = "AIzaSyAKCNMuwfa4S0C5lPGFvl8W6FSasH-Pipc";
const FetchChannelIcon = (channelId) => {
  const result = useQuery(
    ["thumbnail", channelId],
    async () =>
      channelId &&
      (await youtube.get("channels", {
        params: {
          part: "snippet,statistics",
          id: channelId,
          key: key,
        },
      }))
  );

  return [{ ...result }];
};

export default FetchChannelIcon;

// export const useChannelSubscription = (channelId) => {
//   const result = useQuery(
//     ["subscription", channelId],
//     async () =>
//       channelId &&
//       (await youtube.get("subscriptions", {
//         params: {
//           part: "snippet,subscriberSnippet",
//           channelId: channelId,
//           key: key,
//         },
//       }))
//   );

//   return [{ ...result }];
// };
