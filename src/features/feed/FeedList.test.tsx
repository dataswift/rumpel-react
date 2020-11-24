import { render, screen } from "@testing-library/react";
import React from "react";
import { FeedList } from "./FeedList";
import {
  SheFeedItemTextOnly,
  SheFeedItemWeeklySummary
} from "../../testData/SheFeed";
import { SheFeed } from "./she-feed.interface";
import { groupSheFeedByDay } from "../../components/InfiniteScrolling/helper";

describe('FeedList', () => {
  // @ts-ignore
  global.IntersectionObserver = class IntersectionObserver {

    constructor(private func: any, private options: any) {
    }

    observe(element: HTMLElement) {
      this.func([{ isIntersecting: true, target: element }]);
    }

    disconnect() {
      return null;
    };

    unobserve() {
      return null;
    }
  };
            
  const sheFeed: SheFeed[] = [
    SheFeedItemTextOnly,
    SheFeedItemWeeklySummary,
  ];

  test('renders the FeedList component without error when intersecting', () => {
    const mockLastFeedElementIntersecting = jest.fn();

    render(
      <FeedList
        dayGroupedFeed={groupSheFeedByDay(sheFeed)}
        lastFeedElementIntersecting={mockLastFeedElementIntersecting}
      />
    );

    expect(screen.getByAltText('testsource')).toBeInTheDocument();
    expect(screen.getByText('Your recent activity summary')).toBeInTheDocument();
    expect(mockLastFeedElementIntersecting).toBeCalledTimes(1);
  });
});
