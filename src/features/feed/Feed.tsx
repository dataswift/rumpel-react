import React from "react";
import './Feed.scss';
import InfiniteScrolling from "../../components/InfiniteScrolling/InfiniteScrolling";
import { FeedUserActions } from "./FeedUserActions";

export const Feed: React.FC = () => {
  return (
    <div>
      <InfiniteScrolling/>
      <FeedUserActions />
    </div>
  );
};
