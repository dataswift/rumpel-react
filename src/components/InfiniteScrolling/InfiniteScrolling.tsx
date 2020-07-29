import React, { useState } from "react";
import useInfiniteScrolling from "./useInfiniteScrolling";
import { FeedList } from "../../features/feed/FeedList";
import { FeedLoading } from "../Feed/FeedLoading/FeedLoading";

type Props = {
    refreshDate: Date
}

export const InfiniteScrolling: React.FC<Props> = ({ refreshDate }) => {
  const [loadMore, setLoadMore] = useState<Date | null>(null);
  const {
    feed,
    loading,
  } = useInfiniteScrolling(refreshDate, loadMore);

  const lastElementIntersecting = () => {
    setLoadMore(new Date());
  };

  return (
    <>
      <FeedList dayGroupedFeed={feed} loading={loading} lastFeedElementIntersecting={() => lastElementIntersecting()}/>
      {feed.length === 0 && <FeedLoading dataFetched={feed.length > 0} filteredData={false}/>}

    </>
  );
};
