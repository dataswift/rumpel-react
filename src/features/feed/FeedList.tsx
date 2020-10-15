import React, { useCallback, useRef } from "react";
import { DayGroupedSheFeed } from "./she-feed.interface";
import { FeedRollup } from "./FeedRollup";

type Props = {
    dayGroupedFeed: DayGroupedSheFeed[];
    loading?: boolean | null;
    lastFeedElementIntersecting?: () => void | null;
}

export const FeedList: React.FC<Props> = ({ dayGroupedFeed, loading, lastFeedElementIntersecting }) => {
  const observer = useRef<IntersectionObserver>();

  const lastFeedElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        if (lastFeedElementIntersecting) {
          lastFeedElementIntersecting();
        }
      }
    });
    if (node) observer.current.observe(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div className={'she-feed'} id={'she-feed'}>
      {dayGroupedFeed.map((day, index) => {
        if (dayGroupedFeed.length === index + 1) {
          return <div key={day.day + index} ref={lastFeedElementRef}>
            <h5 className="day-separator">{day.day}</h5>
            <FeedRollup sheFeed={day.data}/>
          </div>;
        }
        return <div key={day.day + index}>
          <h5 className="day-separator">{day.day}</h5>
          <FeedRollup sheFeed={day.data}/>
        </div>;
      })}
    </div>
  );
};
