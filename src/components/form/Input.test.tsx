import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Input from './Input';

describe('Input Rumpel', () => {
  test('renders the input component without error', () => {
    render(<Input label={'Test Input'} id={'Test Input'} type={'text'} />);

    expect(screen.getByText('Test Input')).toBeInTheDocument();
  });

  test('user clicks on privacy toggle', () => {
    const mockOnChange = jest.fn();
    render(
      <Input
        label={'Test Input'}
        id={'Test Input'}
        type={'text'}
        profileField={true}
        profilePrivacyToggle={false}
        onProfileSharingChange={mockOnChange}
      />,
    );

    expect(screen.getByText('Test Input')).toBeInTheDocument();
    expect(screen.getByText('Private')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Private'));
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('use attempt a value change', () => {
    const mockOnChange = jest.fn();

    render(<Input label={'test label'} id={'test input'} type={'text'} onChange={mockOnChange} />);

    const input = screen.getByLabelText('test label');

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'test random value' } });

    expect(screen.getByDisplayValue('test random value')).toBeInTheDocument();

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
