import React from "react";
import './Feed.scss';
import InfiniteScrolling from "../../components/InfiniteScrolling/InfiniteScrolling";

export const Feed: React.FC = () => {
  return (
    <div>
      <InfiniteScrolling/>
    </div>
  );
};
