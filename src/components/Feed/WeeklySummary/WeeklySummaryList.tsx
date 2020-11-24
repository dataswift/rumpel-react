import React from "react";
import './WeeklySummary.scss';
import { FeedSourceImg } from "../FeedSourceImg/FeedSourceImg";

type Props = {
    nestedStructure?: { source: string; content: string; badge: string; }[] | null;
}

export const WeeklySummaryList: React.FC<Props> = ({ nestedStructure }) => {

  if (!nestedStructure) return  null;

  return (
    <div className={'weekly-summary-list'}>
      {nestedStructure.map((row, index) => {
        return (
          <div className={'weekly-summary-mat-list-item'} key={row.source + index}>
            <div className="source-content">
              <FeedSourceImg
                className={'source-icon'}
                source={row.source}
                height="25" width="25"/>
              <div className="weekly-summary-list-row-content">{row.content}</div>
            </div>
            <h5 className="weekly-summary-list-row-badge">{row.badge}</h5>
          </div>
        );
      })
      }
    </div>
  );
};
