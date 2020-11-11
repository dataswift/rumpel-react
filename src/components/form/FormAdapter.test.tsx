import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import FormAdapter from "./FormAdapter";
import TEST_PROFILE_FIELDS from "../../testData/ProfileFields";
import { profileInfoValidations } from "../../features/profile/validations";
import Root from "../../app/Root";

describe('FormAdapter', () => {
  test('renders the correct elements without error', () => {
    render(
      <Root>
        <FormAdapter
          profileField={true}
          fields={TEST_PROFILE_FIELDS}
          validations={profileInfoValidations}
          formId={'form-id'}
          values={{}}
        />
      </Root>
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


  test('renders the correct error messages', async () => {
    render(
      <Root>
        <FormAdapter
          profileField={true}
          fields={TEST_PROFILE_FIELDS}
          validations={profileInfoValidations}
          formId={'form-id'}
          values={{}}
        />
      </Root>
    );

    const firstName = screen.getByLabelText('First name');
    const lastName = screen.getByLabelText('Last name');
    const primaryEmail = screen.getByLabelText('Primary email');
    const alternativeEmail = screen.getByLabelText('Alternative email');
    const mobile = screen.getByLabelText('Mobile phone number');
    const landline = screen.getByLabelText('Home phone number');

    fireEvent.change(firstName, { target: { value: '---' } });
    await waitFor(() => expect(screen.getByText('This is not a valid name')).toBeInTheDocument());
    fireEvent.change(firstName, { target: { value: '' } });

    fireEvent.change(lastName, { target: { value: '---' } });
    await waitFor(() => expect(screen.getByText('This is not a valid name')).toBeInTheDocument());
    fireEvent.change(lastName, { target: { value: '' } });

    fireEvent.change(primaryEmail, { target: { value: 'not-valid-email' } });
    await waitFor(() => expect(screen.getByText('This is not a valid email')).toBeInTheDocument());
    fireEvent.change(primaryEmail, { target: { value: '' } });

    fireEvent.change(alternativeEmail, { target: { value: 'not-valid-email' } });
    await waitFor(() => expect(screen.getByText('This is not a valid email')).toBeInTheDocument());
    fireEvent.change(alternativeEmail, { target: { value: '' } });

    fireEvent.change(mobile, { target: { value: 'test-NaN' } });
    await waitFor(() => expect(screen.getByText('This field must be a number')).toBeInTheDocument());
    fireEvent.change(mobile, { target: { value: '' } });

    fireEvent.change(landline, { target: { value: 'test-NaN' } });
    await waitFor(() => expect(screen.getByText('This field must be a number')).toBeInTheDocument());
    fireEvent.change(landline, { target: { value: '' } });
  });

  test('no errors are displayed when user inputs valid values', async () => {
    render(
      <Root>
        <FormAdapter
          profileField={true}
          fields={TEST_PROFILE_FIELDS}
          validations={profileInfoValidations}
          formId={'form-id'}
          values={{}}
        />
      </Root>
    );

    const firstName = screen.getByLabelText('First name');
    const lastName = screen.getByLabelText('Last name');
    const primaryEmail = screen.getByLabelText('Primary email');
    const alternativeEmail = screen.getByLabelText('Alternative email');
    const mobile = screen.getByLabelText('Mobile phone number');
    const landline = screen.getByLabelText('Home phone number');

    fireEvent.change(firstName, { target: { value: 'TestFirstName' } });
    await waitFor(() => expect(screen.queryByText('This is not a valid name')).toBeNull());
    fireEvent.change(firstName, { target: { value: '' } });

    fireEvent.change(lastName, { target: { value: 'TestLastName' } });
    await waitFor(() => expect(screen.queryByText('This is not a valid name')).toBeNull());
    fireEvent.change(lastName, { target: { value: '' } });

    fireEvent.change(primaryEmail, { target: { value: 'valid@email.com' } });
    await waitFor(() => expect(screen.queryByText('TThis is not a valid email')).toBeNull());
    fireEvent.change(primaryEmail, { target: { value: '' } });

    fireEvent.change(alternativeEmail, { target: { value: 'valid@email.com' } });
    await waitFor(() => expect(screen.queryByText('This is not a valid email')).toBeNull());
    fireEvent.change(alternativeEmail, { target: { value: '' } });

    fireEvent.change(mobile, { target: { value: '07777777777' } });
    await waitFor(() => expect(screen.queryByText('This field must be a number')).toBeNull());
    fireEvent.change(mobile, { target: { value: '' } });

    fireEvent.change(landline, { target: { value: '07777777777' } });
    await waitFor(() => expect(screen.queryByText('This field must be a number')).toBeNull());
    fireEvent.change(landline, { target: { value: '' } });
  });
});
