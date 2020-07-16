import React from "react";
import './WeeklySummary.scss';

type Props = {
    nestedStructure?: { source: string; content: string; badge: string; }[] | null;
}

export const WeeklySummaryList: React.FC<Props> = ({ nestedStructure }) => {

  if (!nestedStructure) return  null;


  return (
    <div className={'mat-list'}>
      {nestedStructure.map((row, index) => {
        return (
          <div className={'mat-list-item weekly-summary-mat-list-item'}>
            <div>
              <div className="source-content">
                <img
                  src={''}
                  height="25" width="25" className="source-icon"/>
                <div className="weekly-summary-list-row-content">{row.content}</div>
              </div>
            </div>
            <h5 className="weekly-summary-list-row-badge">{row.badge}</h5>
          </div>
        );
      })
      }
    </div>
  );
};
