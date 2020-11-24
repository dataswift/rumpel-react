import React, { useEffect, useState } from "react";
import './Feed.scss';
import { FeedUserActions } from "./FeedUserActions";
import { FeedFilteredData } from "./FeedFilteredDataList";
import { InfiniteScrolling } from "../../components/InfiniteScrolling/InfiniteScrolling";
import { resetSheFeedValues } from "./feedSlice";
import { useDispatch } from "react-redux";

const Feed: React.FC = () => {
  const [feedState, setFeedState] = useState("infinite-scrolling");
  const [selectedDates, setSelectedDates] = useState({ since: 0, until: 0 });
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedDates.since) {
      setFeedState("filtering");
    }
  }, [selectedDates]);

  const scrollToTheTop = () => {
    const privateSpaceContent = document.getElementById('private-space-content');

    if (privateSpaceContent) {
      privateSpaceContent.scrollTop = 0;
    }
  };

  const onRefreshClick = () => {
    dispatch(resetSheFeedValues());
    setFeedState("infinite-scrolling");
  };

  return (
    <div className={'feed-wrapper'}>
      {feedState === 'filtering' && (
        <FeedFilteredData selectedDates={selectedDates}/>
      )}

      {feedState === 'infinite-scrolling' && (
        <InfiniteScrolling />
      )}
      <FeedUserActions
        onSelectedDates={(since, until) => setSelectedDates({ since: since, until: until })}
        onRefresh={onRefreshClick}
        onGoToToday={scrollToTheTop}
      />
    </div>
  );
};

export default Feed;
