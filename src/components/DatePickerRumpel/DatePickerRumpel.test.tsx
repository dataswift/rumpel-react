import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import DatePickerRumpel from "./DatePickerRumpel";

describe('DatePickerRumpel', () => {
  test('renders the date picker without error', () => {
    render(
      <DatePickerRumpel 
        profileField={true}
        label={'DatePicker'}/>,
    );

    // Check if calendar is hidden by checking the dates
    expect(screen.queryByText('Mon')).toBeNull();
    expect(screen.queryByText('Tue')).toBeNull();
    expect(screen.getByText('Private')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('DatePicker'));

    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();

    // TODO Check if the correct date value is passed to the input field.
    // TODO Check if this possible with the library and RTL.
  });
});
