import React  from "react";
import { SheFeed } from "./she-feed.interface";
import { FeedDefaultItem } from "../../components/Feed/FeedDefaultItem/FeedDefaultItem";
import { WeeklySummary } from "../../components/Feed/WeeklySummary/WeeklySummary";

type Props = {
    feedItem: SheFeed;
}

export const FeedItem: React.FC<Props> = ({ feedItem }) => {

  if (feedItem.types.includes('insight') && feedItem.types.includes('activity')) {
    return <WeeklySummary feedItem={feedItem} />;
  } else if (!(feedItem.types.includes('insight') && feedItem.types.includes('activity'))) {
    return <FeedDefaultItem feedItem={feedItem}/>;
  } else {
    return null;
  }
};
