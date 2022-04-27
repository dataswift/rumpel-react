import React, { useState } from 'react';
// @ts-ignore
import { Calendar } from 'react-date-range';
import { format } from 'date-fns';
import Input from '../form/Input';

type Props = {
  label: string;
  value?: string;
  profileField?: boolean;
  errorMessage?: string;
  onChange: (value: string) => void;
  profilePrivacyToggle?: boolean;
  onProfileSharingChange?: () => void;
};

const DatePickerRumpel: React.FC<Props> = (props) => {
  const {
    label,
    profileField,
    onChange,
    errorMessage,
    value,
    profilePrivacyToggle,
    onProfileSharingChange,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [displayValue, setDisplayValue] = useState<string>(value || '');

  const onDateChange = (date: Date) => {
    const parsedDate = format(date, 'dd/MM/yyyy');

    setSelectedDate(date);
    setIsOpen(false);
    setDisplayValue(parsedDate);
    onChange(parsedDate);
  };

  return (
    <div className="date-range-picker-rumpel">
      <Input
        type="text"
        id="calendar"
        label={label}
        value={displayValue}
        onClick={() => setIsOpen(!isOpen)}
        profileField={profileField}
        errorMessage={errorMessage}
        onChange={() => {}}
        profilePrivacyToggle={profilePrivacyToggle}
        onProfileSharingChange={onProfileSharingChange}
      />
      {isOpen && <Calendar date={selectedDate || new Date()} onChange={onDateChange} />}
    </div>
  );
};

export default DatePickerRumpel;
