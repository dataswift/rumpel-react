import React from 'react';
import './WeeklySummary.scss';
import toolsIcon from '../../../assets/icons/tools_icon.png';
import { SheFeed } from '../../../features/feed/she-feed.interface';
import { WeeklySummaryList } from './WeeklySummaryList';
import weeklySummaryHeaderImage from '../../../assets/images/weekly_summary_header_image.png';
import { transformWeeklySummary } from './helper';

type Props = {
  feedItem: SheFeed;
};

export const WeeklySummary: React.FC<Props> = ({ feedItem }) => (
  <div className="feed-item">
    <div className="weekly-summary-row">
      <div
        className="weekly-summary-header-container"
        style={{ backgroundImage: `url(${weeklySummaryHeaderImage})` }}
      >
        <div className="title-container">
          <div className="weekly-summary-title">{feedItem.title?.text}</div>
          <div className="weekly-summary-subtitle">{feedItem.title?.subtitle}</div>
        </div>

        <div className="weekly-summary-icon-container">
          <img src={toolsIcon} alt="Tool icon" width="26" height="26" />
        </div>
      </div>
      <WeeklySummaryList
        nestedStructure={transformWeeklySummary(feedItem.content?.nestedStructure)}
      />
    </div>
  </div>
);
