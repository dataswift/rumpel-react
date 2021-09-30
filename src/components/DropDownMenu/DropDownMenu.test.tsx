import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import DropDownMenu from './DropDownMenu';

describe('DropDown menu', () => {
  const options = ['option1', 'option2', 'option3'];
  const placeholder = 'testPlaceholder';

  test('renders the dropdown menu without error', () => {
    const mockOnChange = jest.fn();

    render(<DropDownMenu placeholder={placeholder} onChange={mockOnChange} options={options} />);

    // Clicks on the placeholder and the menu appears
    fireEvent.click(screen.getByText('testPlaceholder'));

    expect(screen.getByText('option1')).toBeInTheDocument();
    expect(screen.getByText('option2')).toBeInTheDocument();
    expect(screen.getByText('option3')).toBeInTheDocument();

    // Selects the option3 from the list
    fireEvent.click(screen.getByText('option3'));

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('option3');

    // The menu disappears
    expect(screen.queryByText('option1')).toBeNull();
    expect(screen.queryByText('option2')).toBeNull();
    expect(screen.getByDisplayValue('option3')).toBeInTheDocument();

    // Clicks on the selected option and the menu appears
    fireEvent.click(screen.getByDisplayValue('option3'));

    expect(screen.getByText('option1')).toBeInTheDocument();
    expect(screen.getByText('option2')).toBeInTheDocument();

    // Selects the option1 from the list
    fireEvent.click(screen.getByText('option1'));

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenCalledWith('option1');

    // The menu disappears
    expect(screen.queryByText('option2')).toBeNull();
    expect(screen.queryByText('option3')).toBeNull();

    // The input's value has been updated
    expect(screen.getByDisplayValue('option1')).toBeInTheDocument();
  });
});
