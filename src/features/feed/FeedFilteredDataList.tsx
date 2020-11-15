import React from "react";
import useFilterFeedData from "./useFilterFeedData";
import { FeedList } from "./FeedList";
import { FeedLoading } from "../../components/Feed/FeedLoading/FeedLoading";

type Props = {
    selectedDates: {since: number, until: number}
}

export const FeedFilteredData: React.FC<Props> = ({ selectedDates }) => {
  const { loading, feed } = useFilterFeedData(selectedDates.since, selectedDates.until);

  return (
    <div className={'feed-wrapper'}>
      <FeedList dayGroupedFeed={feed}/>
      {loading && <FeedLoading filteredData={true} dataFetched={!loading}>Loading</FeedLoading>}
    </div>
  );
};
