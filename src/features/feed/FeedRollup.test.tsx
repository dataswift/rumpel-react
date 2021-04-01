import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { FeedRollup } from "./FeedRollup";
import { SheFeedItemTextOnly } from "../../testData/SheFeed";

describe('FeedRollup', () => {
  // Mock data with the same source to trigger the rollup.
  const SheFeedItems = [
    SheFeedItemTextOnly,
    SheFeedItemTextOnly,
    SheFeedItemTextOnly,
    SheFeedItemTextOnly,
    SheFeedItemTextOnly
  ];

  test('renders the FeedRollup component without error', () => {
    render(
      <FeedRollup
        sheFeed={SheFeedItems}
      />
    );

    expect(screen.getByAltText('testsource')).toBeInTheDocument();
    expect(screen.getByText('Test Text Title')).toBeInTheDocument();
    expect(screen.getByText('Test content text')).toBeInTheDocument();
    expect(screen.getByText(/Posted 16 Nov 2020/i)).toBeInTheDocument();
    expect(screen.getByText('See 4 more items')).toBeInTheDocument();
    // Ensure that only the first items is displayed.
    expect(screen.queryAllByAltText('testsource')).toHaveLength(1);

    fireEvent.click(screen.getByText('See 4 more items'));
    expect(screen.queryByText('See 4 more items')).toBeNull();

    // Ensure that only all the items are displayed.
    expect(screen.queryAllByAltText('testsource')).toHaveLength(5);
    expect(screen.queryAllByText('Test Text Title')).toHaveLength(5);
    expect(screen.queryAllByText('Test content text')).toHaveLength(5);

  });
});
