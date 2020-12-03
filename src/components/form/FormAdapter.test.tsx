import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import FormAdapter from "./FormAdapter";
import Root from "../../app/Root";
import ProfileSections from "../../features/profile/ProfileSections";

describe('FormAdapter', () => {
  test('renders the correct elements without error: personal', () => {
    render(
      <Root>
        <FormAdapter
          profileField={true}
          fields={ProfileSections[0].groupFields[0].fields}
          validations={ProfileSections[0].groupFields[0].validations}
          formId={'form-id'}
          values={{}}
        />
      </Root>
    );

    expect(screen.getByText('First name')).toBeInTheDocument();
    expect(screen.getByText('Last name')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Birthday')).toBeInTheDocument();
  });

  test('renders the correct elements without error: contact', () => {
    render(
      <Root>
        <FormAdapter
          profileField={true}
          fields={ProfileSections[0].groupFields[1].fields}
          validations={ProfileSections[0].groupFields[1].validations}
          formId={'form-id'}
          values={{}}
        />
      </Root>
    );

    expect(screen.getByText('Primary email')).toBeInTheDocument();
    expect(screen.getByText('Alternative email')).toBeInTheDocument();
    expect(screen.getByText('Mobile phone number')).toBeInTheDocument();
    expect(screen.getByText('Home phone number')).toBeInTheDocument();
  });

  test('renders the correct elements without error: online', () => {
    render(
      <Root>
        <FormAdapter
          profileField={true}
          fields={ProfileSections[1].groupFields[0].fields}
          validations={ProfileSections[1].groupFields[0].validations}
          formId={'form-id'}
          values={{}}
        />
      </Root>
    );

    expect(screen.getByText('Facebook profile')).toBeInTheDocument();
    expect(screen.getByText('Twitter profile')).toBeInTheDocument();
    expect(screen.getByText('Linkedin')).toBeInTheDocument();
    expect(screen.getByText('Youtube')).toBeInTheDocument();
    expect(screen.getByText('Website')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
  });

  test('renders the correct elements without error: about', () => {
    render(
      <Root>
        <FormAdapter
          profileField={true}
          fields={ProfileSections[2].groupFields[0].fields}
          validations={ProfileSections[2].groupFields[0].validations}
          formId={'form-id'}
          values={{}}
        />
      </Root>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Say something nice about yourself for the world to see')).toBeInTheDocument();
  });


  test('renders the correct error messages for the personal info', async () => {
    render(
      <Root>
        <FormAdapter
          profileField={true}
          fields={ProfileSections[0].groupFields[0].fields}
          validations={ProfileSections[0].groupFields[0].validations}
          formId={'form-id'}
          values={{}}
        />
      </Root>
    );

    const firstName = screen.getByLabelText('First name');
    const lastName = screen.getByLabelText('Last name');

    fireEvent.change(firstName, { target: { value: '---' } });
    await waitFor(() => expect(screen.getByText('This is not a valid name')).toBeInTheDocument());
    fireEvent.change(firstName, { target: { value: '' } });

    fireEvent.change(lastName, { target: { value: '---' } });
    await waitFor(() => expect(screen.getByText('This is not a valid name')).toBeInTheDocument());
    fireEvent.change(lastName, { target: { value: '' } });
  });

  test('renders the correct error messages for validations: contact', async () => {
    render(
      <Root>
        <FormAdapter
          profileField={true}
          fields={ProfileSections[0].groupFields[1].fields}
          validations={ProfileSections[0].groupFields[1].validations}
          formId={'form-id'}
          values={{}}
        />
      </Root>
    );
    
    const primaryEmail = screen.getByLabelText('Primary email');
    const alternativeEmail = screen.getByLabelText('Alternative email');
    const mobile = screen.getByLabelText('Mobile phone number');
    const landline = screen.getByLabelText('Home phone number');
    
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

  test('no errors are displayed when user inputs valid values: personal', async () => {
    render(
      <Root>
        <FormAdapter
          profileField={true}
          fields={ProfileSections[0].groupFields[0].fields}
          validations={ProfileSections[0].groupFields[0].validations}
          formId={'form-id'}
          values={{}}
        />
      </Root>
    );

    const firstName = screen.getByLabelText('First name');
    const lastName = screen.getByLabelText('Last name');

    fireEvent.change(firstName, { target: { value: 'TestFirstName' } });
    await waitFor(() => expect(screen.queryByText('This is not a valid name')).toBeNull());
    fireEvent.change(firstName, { target: { value: '' } });

    fireEvent.change(lastName, { target: { value: 'TestLastName' } });
    await waitFor(() => expect(screen.queryByText('This is not a valid name')).toBeNull());
    fireEvent.change(lastName, { target: { value: '' } });
  });

  test('no errors are displayed when user inputs valid values: contact', async () => {
    render(
      <Root>
        <FormAdapter
          profileField={true}
          fields={ProfileSections[0].groupFields[1].fields}
          validations={ProfileSections[0].groupFields[1].validations}
          formId={'form-id'}
          values={{}}
        />
      </Root>
    );
    
    const primaryEmail = screen.getByLabelText('Primary email');
    const alternativeEmail = screen.getByLabelText('Alternative email');
    const mobile = screen.getByLabelText('Mobile phone number');
    const landline = screen.getByLabelText('Home phone number');

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
