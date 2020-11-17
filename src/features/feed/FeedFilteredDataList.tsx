import React, { useEffect } from "react";
import { FeedList } from "./FeedList";
import { FeedLoading } from "../../components/Feed/FeedLoading/FeedLoading";
import { useDispatch, useSelector } from "react-redux";
import { getSheFeedFilteredData, selectSheFeedDisplayData, selectSheFeedFetching } from "./feedSlice";

type Props = {
    selectedDates: {
        since: number,
        until: number
    }
}

export const FeedFilteredData: React.FC<Props> = ({ selectedDates }) => {
  const feed = useSelector(selectSheFeedDisplayData);
  const fetching = useSelector(selectSheFeedFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSheFeedFilteredData(selectedDates.since, selectedDates.until));
  }, [selectedDates, dispatch]);

  return (
    <div className={'feed-wrapper'}>
      <FeedList dayGroupedFeed={feed}/>
      {feed.length === 0 && <FeedLoading filteredData fetchingData={fetching} />}
    </div>
  );
};
