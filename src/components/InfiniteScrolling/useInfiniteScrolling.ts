import { useEffect, useState } from "react";
import { HatClientService } from "../../services/HatClientService";
import { DayGroupedSheFeed, SheFeed } from "../../features/feed/she-feed.interface";
import { startOfDay, subDays } from "date-fns";
import { groupSheFeedByDay } from "./helper";

export default function useInfiniteScrolling(refreshDate: Date, loadMore?: Date | null) {
  // TODO Refactoring. There is a quite a few useStates here.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [feed, setFeed] = useState<DayGroupedSheFeed[]>([]);
  const [items, setItems] = useState<SheFeed[]>([]);
  const [displayItems, setDisplayItems] = useState<SheFeed[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [since, setSince] = useState(Math.round(subDays(Date.now(), 20).getTime() / 1000));
  const [until, setUntil] = useState(Math.round(startOfDay(Date.now()).getTime() / 1000));
  const [step, setStep] = useState(1);
  const [repeats, setRepeats] = useState(0);
  const [notEnoughData, setNotEnoughData] = useState(true);

  useEffect(() => {
    setFeed(groupSheFeedByDay(items));
  }, [items]);

  useEffect(() => {
    setSince(Math.round(subDays(Date.now(), 20).getTime() / 1000));
    setUntil(Math.round(startOfDay(Date.now()).getTime() / 1000));
    setItems([]);
  }, [refreshDate]);

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
          setHasMore(true);
        }
        const newSince = Math.round(subDays(until * 1000, 30 * step).getTime() / 1000);
        setUntil(since - 1);
        setSince(newSince);

        setNotEnoughData(false);

        if(items.length > 5) {
          // setRepeats(0);
          setLoading(false);
          setHasMore(true);
        } else {
          setRepeats(repeats => repeats + 1);
          setStep(2);
        }

        setDisplayItems(items.slice(0, 50));
      } catch (e) {
        // TODO Error Handling
        setError(true);
        setLoading(false);
        setNotEnoughData(false);
        console.log(e);
      }
    };

    if ((items.length === 0 && repeats < 4)) {
      fetchFeed();
    } else {
      setLoading(false);
    }

    if (loadMore) {
      fetchFeed();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshDate, notEnoughData, loadMore, repeats]);

  return { loading, error, feed, items, displayItems, hasMore, setNotEnoughData };
}
