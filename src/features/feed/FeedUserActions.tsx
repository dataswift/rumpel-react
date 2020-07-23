import React, { useState } from 'react';
import { DateRangePickerRumpel } from "../../components/DateRangePickerRumpel/DateRangePickerRumpel";

export const FeedUserActions: React.FC = () => {
  const [hideDateRangePicker, setHideDateRangePicker] = useState(true);

  const selectedDates = (startDay: number, endDay: number) => {
    console.log(startDay, endDay);
    setHideDateRangePicker(true);
  };

  return (
    <div className="user-actions">
      {!hideDateRangePicker &&
        <div style={{ margin: 'auto' }}>
          <DateRangePickerRumpel selectedDates={(startDay, endDay) => {selectedDates(startDay, endDay);}}/>
        </div>
      }
      <div className="user-actions-content">
        <button className="filter-button" onClick={() => setHideDateRangePicker(!hideDateRangePicker)}>
          <i className={'material-icons'}>filter_list</i>
            Filter
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
