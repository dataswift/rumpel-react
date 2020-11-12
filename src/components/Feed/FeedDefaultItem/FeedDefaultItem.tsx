import React, { useEffect, useRef, useState } from "react";
import './FeedDefaultItem.scss';

import { format } from "date-fns";
import { SheFeed } from "../../../features/feed/she-feed.interface";
import { FeedSourceImg } from "../FeedSourceImg/FeedSourceImg";

type Props = {
    feedItem: SheFeed;
}

export const FeedDefaultItem: React.FC<Props> = ({ feedItem }) => {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const content = useRef<HTMLObjectElement>(null);


  useEffect(() => {
    if (!content.current) return;

    setOverflowing(content.current?.clientHeight < content.current?.scrollHeight);
  }, [feedItem]);

  return (
    <div className="feed-item">
      <div className="img-wrapper">
        <FeedSourceImg
          source={feedItem.source}
          types={feedItem.types}
          height="35" width="35"/>
        <div className="arrow-left" />
      </div>
      <div className="feed-card">
        <div className="feed-card-header">
          <h4 className="card-header-title">{feedItem.title?.text}</h4>
          <span className="flex-spacer" />
        </div>
        {feedItem.content && !feedItem.content.media && (
          <>
            <div className="feed-card-content no-image">
              {feedItem.content.text && (
                <div className={`feed-item-content ${ expanded ? 'expanded' : '' }`}
                  ref={content}>
                  {feedItem.content.text.trim()}
                </div>
              )}
              {feedItem.location && feedItem.location.address && (
                <div>
                  <div>{feedItem.location.address.name}</div>
                  <div>{feedItem.location.address.street}</div>
                  <div>{feedItem.location.address.city}</div>
                  <div>{feedItem.location.address.country}</div>
                </div>
              )}
            </div>
            <div className="feed-card-footer">
              <span>Posted {format(new Date(feedItem.date.iso), 'dd MMM yyyy h:mma')}</span>
              <span className="flex-spacer-small"/>
              {!expanded && overflowing && (
                <span className="card-expand-tag" onClick={() => setExpanded(true)}>Show More</span>
              )}
            </div>
          </>
        )}
        {feedItem.content && feedItem.content.media && feedItem.content.media.length > 0 && (
          <div className="feed-card-content single-image"
            style={{ backgroundImage: `url(${ feedItem.content.media[0].url })` }}>
            <div className="feed-item-overlay">
              <div className="feed-item-overlay-content">{feedItem.content.text}</div>
              <div className="feed-item-overlay-footer">
                    Posted {format(new Date(feedItem.date.iso), 'dd MMM yyyy h:mma') }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
