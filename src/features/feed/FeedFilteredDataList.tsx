import React from "react";
import useFilterFeedData from "./useFilterFeedData";
import { FeedList } from "./FeedList";
import { FeedLoading } from "../../components/Feed/FeedLoading/FeedLoading";

type Props = {
    selectedDates: {since: number, until: number}
}

export const FeedFilteredData: React.FC<Props> = ({ selectedDates }) => {
  const { loading, feed, error } = useFilterFeedData(selectedDates.since, selectedDates.until);

  return (
    <>
      {loading && <FeedLoading filteredData={!loading} dataFetched={!loading}>Loading</FeedLoading>}
      {error && <div>Error</div>}
      <FeedList dayGroupedFeed={feed}/>
    </>
  );
};
