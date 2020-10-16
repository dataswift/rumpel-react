import React, { useEffect, useState } from "react";
import './Feed.scss';
import { FeedUserActions } from "./FeedUserActions";
import { FeedFilteredData } from "./FeedFilteredDataList";
import { InfiniteScrolling } from "../../components/InfiniteScrolling/InfiniteScrolling";

const Feed: React.FC = () => {
  const [refreshDate, setRefreshDate] = useState(new Date());
  const [feedState, setFeedState] = useState("infinite-scrolling");
  const [selectedDates, setSelectedDates] = useState({ since: 0, until: 0 });

  useEffect(() => {
    if (selectedDates.since) {
      setFeedState("filtering");
    }
  }, [selectedDates]);

  useEffect(() => {
    setFeedState("infinite-scrolling");
  }, [refreshDate]);

  const scrollToTheTop = () => {
    const privateSpaceContent = document.getElementById('private-space-content');

    if (privateSpaceContent) {
      privateSpaceContent.scrollTop = 0;
    }
  };

  return (
    <div className={'feed-wrapper'}>
      {feedState === 'filtering' && (
        <FeedFilteredData selectedDates={selectedDates}/>
      )}

      {feedState === 'infinite-scrolling' && (
        <InfiniteScrolling refreshDate={refreshDate}/>
      )}
      <FeedUserActions
        onSelectedDates={(since, until) => {setSelectedDates({ since: since, until: until });}}
        onRefresh={date => setRefreshDate(date)}
        onGoToToday={() => scrollToTheTop()}
      />
    </div>
  );
};

export default Feed;
