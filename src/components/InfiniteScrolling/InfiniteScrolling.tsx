import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeedList } from '../../features/feed/FeedList';
import { FeedLoading } from '../Feed/FeedLoading/FeedLoading';
import {
  getInitSheFeed,
  getMoreSheFeedData,
  selectSheFeedDisplayData,
  selectSheFeedFetching,
} from '../../features/feed/feedSlice';

export const InfiniteScrolling: React.FC = () => {
  const feed = useSelector(selectSheFeedDisplayData);
  const fetching = useSelector(selectSheFeedFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    if (feed.length === 0) {
      dispatch(getInitSheFeed());
    }
  }, [feed, dispatch]);

  const lastElementIntersecting = () => {
    dispatch(getMoreSheFeedData());
  };

  return (
    <>
      <FeedList
        dayGroupedFeed={feed}
        loading={fetching}
        lastFeedElementIntersecting={() => lastElementIntersecting()}
      />
      {feed.length === 0 && <FeedLoading fetchingData={fetching} />}
    </>
  );
};
