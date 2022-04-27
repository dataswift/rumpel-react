import { format } from 'date-fns';
import { groupBy } from 'lodash';
import { SheFeed } from '../../features/feed/she-feed.interface';

export const groupSheFeedByDay = (feedItems: SheFeed[]): { day: string; data: SheFeed[] }[] => {
  const groupedByDay = groupBy(
    feedItems,
    (item) => format(item.date.unix * 1000, 'EEE dd MMM yyyy') as string,
  );

  return Object.keys(groupedByDay).map((day: string) => ({ day, data: groupedByDay[day] }));
};
