import { render, screen } from "@testing-library/react";
import React from "react";
import FormAdapter from "./FormAdapter";
import TEST_PROFILE_FIELDS from "../../testData/ProfileFields";

describe('FormAdapter', () => {
  test('renders the correct elements without error', () => {
    render(
      <FormAdapter
        profileField={true}
        fields={TEST_PROFILE_FIELDS}
        values={{}}
      />,
    );

    expect(screen.getByText('First name')).toBeInTheDocument();
    expect(screen.getByText('Last name')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Birthday')).toBeInTheDocument();
    expect(screen.getByText('Primary email')).toBeInTheDocument();
    expect(screen.getByText('Alternative email')).toBeInTheDocument();
    expect(screen.getByText('Mobile phone number')).toBeInTheDocument();
    expect(screen.getByText('Home phone number')).toBeInTheDocument();
  });
});
