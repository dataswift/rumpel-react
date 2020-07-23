import React, { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './DateRangePickerRumpel.scss';
import { DateRangePicker, Range } from 'react-date-range';
import { endOfDay, getUnixTime, startOfDay } from "date-fns";

type Props = {
    selectedDates: (startDay: number, endDay: number) => void;
}

export const DateRangePickerRumpel: React.FC<Props> = ({ selectedDates }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const onChange = (range: Range) => {
    // @ts-ignore
    setState([range.selection]);
  };

  const onDone = () => {
    const startDay = getUnixTime(startOfDay(state[0].startDate));
    const endDay = getUnixTime(endOfDay(state[0].endDate));

    selectedDates(startDay, endDay);
  };

  return (
    <div className={'date-range-picker-rumpel'}>
      <DateRangePicker
        onChange={onChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        ranges={state}
        showMonthArrow={true}
        direction={'horizontal'}
        months={1}
      />
      <button className={'btn btn-accent date-range-picker-rumpel-done'}
        onClick={() => onDone()}>
          Done
      </button>
    </div>
  );
};
