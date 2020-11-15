import { useEffect, useState } from "react";
import { HatClientService } from "../../services/HatClientService";
import { DayGroupedSheFeed, SheFeed } from "./she-feed.interface";
import { groupSheFeedByDay } from "../../components/InfiniteScrolling/helper";

export default function useFilterFeedData(since: number, until: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [feed, setFeed] = useState<DayGroupedSheFeed[]>([]);
  const [items, setItems] = useState<SheFeed[]>([]);

  useEffect(() => {
    setFeed(groupSheFeedByDay(items));
  }, [items]);

  useEffect(() => {

    const fetchFeed = async () => {
      setItems([]);
      setLoading(true);
      setError(false);

      try {
        const res = await HatClientService.getInstance().getSheRecords("", since, until);

        if (res?.parsedBody && res.parsedBody.length > 0) {
          setItems(prevItems => {
            // @ts-ignore
            return [...prevItems, ...res.parsedBody];
          });
          setLoading(false);
        }
      } catch (e) {
        // TODO Error Handling
        setError(true);
        setLoading(false);
      }
    };

    if (since) {
      fetchFeed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [since, until]);

  return { loading, error, feed, items };
}
