import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import DropDownMenu from "./DropDownMenu";

describe('DropDown menu', () => {
  const options = ['option1', 'option2', 'option3'];
  const placeholder = 'testPlaceholder';

  test('renders the dropdown menu without error', () => {
    render(
      <DropDownMenu placeholder={placeholder} options={options}/>,
    );

    fireEvent.click(screen.getByText('testPlaceholder'));

    expect(screen.getByText('option1')).toBeInTheDocument();
    expect(screen.getByText('option2')).toBeInTheDocument();
    expect(screen.getByText('option3')).toBeInTheDocument();

    fireEvent.click(screen.getByText('option3'));
    expect(screen.queryByText('option1')).toBeNull();
    expect(screen.queryByText('option2')).toBeNull();
    expect(screen.getByText('option3')).toBeInTheDocument();

    fireEvent.click(screen.getByText('option3'));

    expect(screen.getByText('option1')).toBeInTheDocument();
    expect(screen.getByText('option2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('option1'));
    expect(screen.queryByText('option2')).toBeNull();
    expect(screen.queryByText('option3')).toBeNull();
    expect(screen.getByText('option1')).toBeInTheDocument();
  });
});
