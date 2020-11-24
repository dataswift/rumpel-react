import { render, screen } from "@testing-library/react";
import React from "react";
import { FeedSourceImg } from "./FeedSourceImg";

describe('FeedSourceImg', () => {

  test('renders the FeedSourceImg component without error: facebook', () => {
    render(
      <FeedSourceImg source={'facebook'} />
    );

    expect(screen.getByAltText('facebook')).toBeInTheDocument();
  });

  test('renders the FeedSourceImg component without error: she', () => {
    render(
      <FeedSourceImg source={'she'} />
    );

    expect(screen.getByAltText('she')).toBeInTheDocument();
  });

  test('renders the FeedSourceImg component without error: she sentiment', () => {
    render(
      <FeedSourceImg source={'she'} types={['sentiment']}/>
    );

    expect(screen.getByAltText('she')).toBeInTheDocument();
  });

  test('renders the FeedSourceImg component without error: drops wordcloud', () => {
    render(
      <FeedSourceImg source={'drops'} types={['wordcloud']}/>
    );

    expect(screen.getByAltText('drops')).toBeInTheDocument();
  });
});
