import React from "react";
import './WeeklySummary.scss';
import toolsIcon from "../../../assets/icons/tools_icon.png";
import { SheFeed, SheNestedStructure } from "../../../features/feed/she-feed.interface";
import { WeeklySummaryList } from "./WeeklySummaryList";

type Props = {
    feedItem: SheFeed;
}

export const WeeklySummary: React.FC<Props> = ({ feedItem }) => {

  const transform = (structure?: { [key: string]: SheNestedStructure[] } ): { source: string; content: string; badge: string; }[] | null => {
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

    });

    if (hasSentiment) {
      weeklySummaryArray.push({ source: 'sentiment', content: contentSentiment.trim(), badge: badgeSentiment });
    }
    if (hasFitbit) {
      weeklySummaryArray.push({ source: 'fitbit', content: contentFitbit.trim(), badge: badgeFitbit });
    }

    return weeklySummaryArray;
  };

  return (
    <div className={'feed-item'}>
      <div className="weekly-summary-row">
        <div className="weekly-summary-header-container">
          <div className="title-container">
            <div className="weekly-summary-title">{feedItem.title?.text}</div>
            <div className="weekly-summary-subtitle">{feedItem.title?.subtitle}</div>
          </div>

          <div className="weekly-summary-icon-container">
            <img src={toolsIcon} alt="" width="26" height="26" />
          </div>

          <WeeklySummaryList nestedStructure={transform(feedItem.content?.nestedStructure)}/>
        </div>
      </div>
    </div>
  );
};
