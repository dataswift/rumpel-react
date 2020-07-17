import React from "react";
import useInfiniteScrolling from "./useInfiniteScrolling";
import { FeedList } from "../../features/feed/FeedList";

export default function InfiniteScrolling() {
  const {
    feed,
    loading,
    error,
  } = useInfiniteScrolling("");

  // const observer = useRef<IntersectionObserver>();

  // const lastBookElementRef = useCallback(node => {
  //   if (loading) return;
  //   if (observer.current) {
  //     observer.current.disconnect();
  //   }
  //
  //   observer.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && hasMore) {
  //       // setPageNumber(prevPageNumber => prevPageNumber + 1);
  //       // setNotEnoughData(true);
  //     }
  //   });
  //   if (node) observer.current.observe(node);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loading, hasMore]);

  return (
    <>
      {/*{feed.map((item, index) => {*/}
      {/*  if (feed.length === index + 1) {*/}
      {/*    return <div ref={lastBookElementRef}*/}
      {/*      style={{ height: '180px', padding: '16px' }}*/}
      {/*      key={`${ item } key ${ index }`}>{item.day + index}</div>;*/}
      {/*  } else {*/}
      {/*    return <FeedList key={`${ item } key ${ index }`} dayGroupedFeed={feed}/>;*/}
      {/*  }*/}
      {/*})}*/}
      <FeedList dayGroupedFeed={feed}/>

      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  );
}
