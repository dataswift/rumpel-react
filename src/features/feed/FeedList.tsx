import React from "react";
import { DayGroupedSheFeed } from "./she-feed.interface";
import { FeedRollup } from "./FeedRollup";

type Props = {
    dayGroupedFeed: DayGroupedSheFeed[];
}
export const FeedList: React.FC<Props> = ({ dayGroupedFeed }) => {
  return (
    <div className={'she-feed'}>
      {dayGroupedFeed.map(day => {
        return <>
          <h5 className="day-separator">{day.day}</h5>
          <FeedRollup sheFeed={day.data}/>
        </>;
      })}
    </div>
  );
};
