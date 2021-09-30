import React, { useState } from 'react';
import { DateRangePickerRumpel } from '../../components/DateRangePickerRumpel/DateRangePickerRumpel';

type Props = {
  onSelectedDates: (since: number, until: number) => void;
  onRefresh: () => void;
  onGoToToday: () => void;
};

export const FeedUserActions: React.FC<Props> = ({ onSelectedDates, onRefresh, onGoToToday }) => {
  const [hideDateRangePicker, setHideDateRangePicker] = useState(true);

  const selectedDates = (since: number, until: number) => {
    onSelectedDates(since, until);
    setHideDateRangePicker(true);
  };

  return (
    <div className="feed-user-actions">
      {!hideDateRangePicker && (
        <div style={{ margin: 'auto' }}>
          <DateRangePickerRumpel selectedDates={(since, until) => selectedDates(since, until)} />
        </div>
      )}
      <div className="feed-user-actions-content">
        <button className="filter-button" onClick={() => setHideDateRangePicker(!hideDateRangePicker)}>
          <i className={'material-icons'}>filter_list</i>
          Filter
        </button>
        <button className="today-button" onClick={() => onGoToToday()}>
          <i className={'material-icons'}>fullscreen_exit</i>
          Today
        </button>
        <button className="today-button" onClick={() => onRefresh()}>
          <i className={'material-icons'}>refresh</i>
          Refresh
        </button>
      </div>
    </div>
  );
};
