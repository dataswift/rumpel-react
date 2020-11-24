import React, { useEffect, useState } from "react";
import { SheFeed } from "./she-feed.interface";
import { FeedItem } from "./FeedItem";

const MIN_ROLLUP_ITEMS = 3;

type Props = {
    sheFeed: SheFeed[]
}

type RolledUpFeed = Array<{ expanded: boolean; rollup: Array<SheFeed>; }>;

type PropsItem = {
    rolledUpItem: { expanded: boolean; rollup: Array<SheFeed>; };
}

const FeedRollupItem: React.FC<PropsItem> = ({ rolledUpItem }) => {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    setExpanded(rolledUpItem.expanded);
  }, [rolledUpItem]);

  if ((rolledUpItem.rollup.length < MIN_ROLLUP_ITEMS) || expanded) {
    return (
      <>
        {
          rolledUpItem.rollup.map((feedItem, index) => {
            return <FeedItem key={feedItem.source + index} feedItem={feedItem}/>;
          })
        }
      </>
    );
  } else {
    return (
      <div>
        <FeedItem feedItem={rolledUpItem.rollup[0]}/>
        <button 
          className={'feed-item-rollup-control'} 
          onClick={() => setExpanded(!expanded)}>
            See {rolledUpItem.rollup.length - 1} more items
        </button>
      </div>
    );
  }
};

export const FeedRollup: React.FC<Props> = ({ sheFeed }) => {
  const [rollupFeed, setRollupFeed] = useState<RolledUpFeed>([]);

  useEffect(() => {
    const rolledUp = sheFeed
      .reduce<RolledUpFeed>((accumulator, sheItem: SheFeed, index: number, sheFeed: SheFeed[]) => {
        const previousSource = index > 0 ? sheFeed[index - 1].source : null;

        if (previousSource === sheItem.source) {
          accumulator[accumulator.length - 1].rollup.push(sheItem);
        } else {
          accumulator.push({ expanded: false, rollup: [sheItem] });
        }

        return accumulator;
      }, []);

    setRollupFeed(rolledUp);
  }, [sheFeed]);

  return (
    <div>
      {rollupFeed.map((rolledUpItem, index) => {
        return <FeedRollupItem rolledUpItem={rolledUpItem} key={'rollupindex' + index}/>;
      })}
    </div>
  );
};
