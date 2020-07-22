import React  from 'react';

export const FeedUserActions: React.FC = () => {
  return (
    <div className="user-actions">

      <div className="user-actions-content">
        <button className="filter-button">
          <i className={'material-icons'}>filter_list</i>Filter
        </button>
        <button className="today-button">
          <i className={'material-icons'}>fullscreen_exit</i>
        Today
        </button>
        <button className="today-button">
          <i className={'material-icons'}>refresh</i>
        Refresh
        </button>
      </div>
    </div>
  );
};
