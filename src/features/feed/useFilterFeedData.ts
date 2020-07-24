import { useEffect, useState } from "react";
import { HatClientService } from "../../services/HatClientService";
import { DayGroupedSheFeed, SheFeed } from "../../features/feed/she-feed.interface";
import { groupBy } from 'lodash';
import { format } from "date-fns";

export default function useFilterFeedData(since: number, until: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [feed, setFeed] = useState<DayGroupedSheFeed[]>([]);
  const [items, setItems] = useState<SheFeed[]>([]);

  useEffect(() => {
    setFeed(groupSheFeedByDay(items));
  }, [items]);

  const groupSheFeedByDay = (feedItems: SheFeed[]): { day: string; data: SheFeed[] }[] => {
    const groupedByDay = groupBy(feedItems, item => format(item.date.unix * 1000, 'EEE dd MMM yyyy') as string);

    return Object.keys(groupedByDay)
      .map((day: string) => {
        return { day: day, data: groupedByDay[day] };
      });
  };

  useEffect(() => {
    setItems([]);
  }, [since, until]);

  useEffect(() => {

    const fetchFeed = async () => {
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
        console.log(e);
      }
    };

    if (since) {
      fetchFeed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [since, until]);

  return { loading, error, feed, items };
}
