import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import ApplicationList from './ApplicationList';
import TEST_HAT_APPLICATION from '../../testData/HatApplications';

describe('HAT Application List', () => {
  test('renders two test hat application in the list without error.', () => {
    const testApps = [
      { ...TEST_HAT_APPLICATION },
      {
        ...TEST_HAT_APPLICATION,
        application: {
          ...TEST_HAT_APPLICATION.application,
          id: '2',
        },
      },
    ];
    render(<ApplicationList hatApps={testApps} onAppClick={jest.fn()} />);

    expect(screen.getAllByText('Test Application').length).toEqual(2);
    expect(screen.getAllByText('The Test Application').length).toEqual(2);
    expect(screen.getAllByAltText('HAT Application Logo').length).toEqual(2);
  });

  test('ensure onClick is called whem the hat Application is pressed.', () => {
    const mockOnClick = jest.fn();
    render(<ApplicationList hatApps={[TEST_HAT_APPLICATION]} onAppClick={mockOnClick} />);

    fireEvent.click(screen.getByText('Test Application'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith('1');
  });

  test('the correct icon text is displayed for each hat application status', () => {
    const { rerender } = render(
      <ApplicationList hatApps={[TEST_HAT_APPLICATION]} onAppClick={jest.fn()} />,
    );
    expect(screen.getByText('exit_to_app')).toBeInTheDocument();

    const needsUpdatingApp = { ...TEST_HAT_APPLICATION, needsUpdating: true };
    rerender(<ApplicationList hatApps={[needsUpdatingApp]} onAppClick={jest.fn()} />);
    expect(screen.getByText('refresh')).toBeInTheDocument();

    const untouchedApp = { ...TEST_HAT_APPLICATION, enabled: false, active: false };
    rerender(<ApplicationList hatApps={[untouchedApp]} onAppClick={jest.fn()} />);
    expect(screen.getByText('add_circle_outline')).toBeInTheDocument();

    const failingApp = { ...TEST_HAT_APPLICATION, enabled: true, active: false };
    rerender(<ApplicationList hatApps={[failingApp]} onAppClick={jest.fn()} />);
    expect(screen.getByText('sync_problem')).toBeInTheDocument();

    const fetchingApp = {
      ...TEST_HAT_APPLICATION,
      enabled: true,
      active: true,
      application: {
        ...TEST_HAT_APPLICATION.application,
        kind: { kind: 'DataPlug' },
      },
    };
    rerender(<ApplicationList hatApps={[fetchingApp]} onAppClick={jest.fn()} />);
    expect(screen.getByText('sync')).toBeInTheDocument();

    const goToApp = {
      ...TEST_HAT_APPLICATION,
      enabled: true,
      active: true,
      application: {
        ...TEST_HAT_APPLICATION.application,
        kind: { kind: 'App' },
      },
    };
    rerender(<ApplicationList hatApps={[goToApp]} onAppClick={jest.fn()} />);
    expect(screen.getByText('exit_to_app')).toBeInTheDocument();
  });
});
