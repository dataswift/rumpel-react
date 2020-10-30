import React, { useState } from 'react';
// @ts-ignore
import { Calendar } from 'react-date-range';
import Input from "../form/Input";
import { format } from "date-fns";

type Props = {
    label: string;
    value?: string;
    profileField?: boolean;
}

const DatePickerRumpel: React.FC<Props> = ({ label, profileField, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const inputValue = selectedDate ? format(new Date(selectedDate), 'dd/MM/yyyy') : value || '';

  const onChange = (date: Date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  return (
    <div className={'date-range-picker-rumpel'}>
      <Input type={'text'} 
        id={'calendar'} 
        label={label}
        value={inputValue}
        onClick={() => setIsOpen(!isOpen)}
        profileField={profileField}
        onChange={() => {}}
      />
      {isOpen && (
        <Calendar
          date={selectedDate || new Date()}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default DatePickerRumpel;
