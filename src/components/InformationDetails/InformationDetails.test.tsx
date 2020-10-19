import React from 'react';

import { screen, render } from '@testing-library/react';
import InformationDetails from "./InformationDetails";
import Root from "../../app/Root";

describe('Information Details', () => {
  test('renders the information and ensures the correct data is present.', () => {
    const testData: Array<{ [key: string]: string }> = [
      { Test: 'Dataswift Ltd' },
      { TestLink: 'https://dataswift.io' },
    ];

    render(
      <Root>
        <InformationDetails
          header={'Test header Info'}
          description={'text description'}
          screenshots={['screenshot1', 'screenshot2']}
          informationListData={testData}
        />
      </Root>
    );

    expect(screen.getByText('Test header Info')).toBeInTheDocument();

    expect(screen.getByText('text description')).toBeInTheDocument();
    expect(screen.queryAllByAltText('Screenshot').length).toEqual(2);

    expect(screen.getByText('Information')).toBeInTheDocument();
    const link = screen.getByText('https://dataswift.io');
    expect(link).toHaveAttribute('href', 'https://dataswift.io');
  });

  test('renders the information and ensures the data is present without screenshots.', () => {
    const testData: Array<{ [key: string]: string }> = [
      { Test: 'Dataswift Ltd' },
      { TestLink: 'https://dataswift.io' },
    ];

    render(
      <Root>
        <InformationDetails
          header={'Test header Info'}
          description={'text description'}
          informationListData={testData}
        />
      </Root>
    );

    expect(screen.getByText('Test header Info')).toBeInTheDocument();

    expect(screen.getByText('text description')).toBeInTheDocument();
    expect(screen.queryAllByAltText('Screenshot').length).toEqual(0);

    expect(screen.getByText('Information')).toBeInTheDocument();
    const link = screen.getByText('https://dataswift.io');
    expect(link).toHaveAttribute('href', 'https://dataswift.io');
  });
});
