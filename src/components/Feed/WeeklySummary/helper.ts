import { SheNestedStructure } from "../../../features/feed/she-feed.interface";

export const transformWeeklySummary = (structure?: { [key: string]: SheNestedStructure[] } )
    : { source: string; content: string; badge: string; }[] | null => {
  const weeklySummaryArray = [];
  let hasSentiment = false;
  let hasFitbit = false;
  let contentSentiment = '';
  let badgeSentiment = '';
  let contentFitbit = '';
  let badgeFitbit = '';

  if (!structure) return null;

  Object.keys(structure).map( key => {
    if (key.includes('sentiment')) {
      contentSentiment += structure[key][0].content + '\n';
      badgeSentiment += structure[key][0].badge + '\n';
      hasSentiment = true;
    } else if (key.includes('fitbit')) {
      contentFitbit += structure[key][0].content + '\n';
      badgeFitbit += structure[key][0].badge + '\n';
      hasFitbit = true;
    } else {
      weeklySummaryArray.push({ source: key, content: structure[key][0].content, badge: structure[key][0].badge });
    }

    return key;
  });

  if (hasSentiment) {
    weeklySummaryArray.push({ source: 'sentiment', content: contentSentiment.trim(), badge: badgeSentiment });
  }
  if (hasFitbit) {
    weeklySummaryArray.push({ source: 'fitbit', content: contentFitbit.trim(), badge: badgeFitbit });
  }

  return weeklySummaryArray;
};
