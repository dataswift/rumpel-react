import { useEffect, useState } from "react";
import { HatClientService } from "../../services/HatClientService";
import { SheFeed } from "../../features/feed/she-feed.interface";
import { startOfDay, subDays } from "date-fns";

export default function useBookSearch(endpoint: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState<SheFeed[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [since, setSince] = useState(Math.round(startOfDay(Date.now()).getTime() / 1000));
  const [until, setUntil] = useState(Math.round(subDays(Date.now(), 30).getTime() / 1000));
  const [step, setStep] = useState(1);
  const [repeats, setRepeats] = useState(0);
  const [notEnoughData, setNotEnoughData] = useState(true);

  useEffect(() => {
    setItems([]);
  }, [endpoint]);

  useEffect(() => {

    const fetchFeed = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await HatClientService.getInstance().getSheRecords(endpoint, since, until);

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

        if(items.length > 5) {
          setRepeats(0);
          setLoading(false);
          setNotEnoughData(false);
          setHasMore(true);
        } else {
          setRepeats(repeats => repeats + 1);
          setStep(2);
        }
      } catch (e) {
        // TODO Error Handling
        setError(true);
        setLoading(false);
        setNotEnoughData(false);
        console.log(e);
      }
    };

    if (repeats < 6 && notEnoughData) {
      fetchFeed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, notEnoughData, repeats]);

  return { loading, error, items, hasMore, setNotEnoughData };
}
