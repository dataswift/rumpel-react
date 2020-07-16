import React, { useEffect, useRef, useState } from "react";
import './FeedDefaultItem.scss';
import facebookIcon from "../../../assets/icons/she-facebook.svg";
import twitterIcon from "../../../assets/icons/she-twitter.svg";
import fitbitIcon from "../../../assets/icons/she-fitbit.svg";
import instagramIcon from "../../../assets/icons/she-instagram.svg";
import googleIcon from "../../../assets/icons/she-google.svg";
import spotifyIcon from "../../../assets/icons/she-spotify.svg";

import { format } from "date-fns";
import { SheFeed } from "../../../features/feed/she-feed.interface";

type Props = {
    feedItem: SheFeed;
}

const imgSrc: Record<string, any> = {
  facebook: facebookIcon,
  twitter: twitterIcon,
  fitbit: fitbitIcon,
  instagram: instagramIcon,
  google: googleIcon,
  spotify: spotifyIcon,
};

export const FeedDefaultItem: React.FC<Props> = ({ feedItem }) => {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const content = useRef<HTMLObjectElement>(null);


  useEffect(() => {
    if (!content.current) return;

    const ov = content.current?.clientHeight < content.current?.scrollHeight;

    setOverflowing(ov);
  }, [feedItem]);

  return (
    <div className={'feed-item'}>
      <div className="img-wrapper">
        <img
          src={imgSrc[feedItem.source]}
          height="35" width="35"/>
        <div className="arrow-left" />
      </div>
      <div className={'feed-card'}>
        <div className={'feed-card-header'}>
          <h4 className="card-header-title">{feedItem.title?.text}</h4>
          <span className="flex-spacer" />
        </div>
        {feedItem.content && !feedItem.content.media && (
          <>
            <div className={'feed-card-content no-image'}>
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
            <div className={'feed-card-footer'}>
              <span>Posted {format(new Date(feedItem.date.iso), 'dd MMM yyyy h:mma')}</span>
              <span className="flex-spacer-small"/>
              {!expanded && overflowing && (
                <span className="card-expand-tag" onClick={() => setExpanded(true)}>Show More</span>
              )}
            </div>
          </>
        )}
        {feedItem.content && feedItem.content.media && feedItem.content.media.length > 0 && (
          <>
            <div className={'feed-card-content single-image'}
              style={{ backgroundImage: `url(${ feedItem.content.media[0].url })` }}>
              <div className="feed-item-overlay">
                <div className="feed-item-overlay-content">{feedItem.content.text}</div>
                <div className="feed-item-overlay-footer">
                    Posted {format(new Date(feedItem.date.iso), 'dd MMM yyyy h:mma') }
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
