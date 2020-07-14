import React, { useCallback, useRef } from "react";
import useInfiniteScrolling from "./useInfiniteScrolling";

export default function InfiniteScrolling() {
  // const [pageNumber, setPageNumber] = useState(1);

  const {
    items,
    hasMore,
    loading,
    error,
    setNotEnoughData
  } = useInfiniteScrolling("");

  const observer = useRef<IntersectionObserver>();

  const lastBookElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        // setPageNumber(prevPageNumber => prevPageNumber + 1);
        setNotEnoughData(true);
      }
    });
    if (node) observer.current.observe(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, hasMore]);

  return (
    <>
      {items.map((item, index) => {
        if (items.length === index + 1) {
          return <div ref={lastBookElementRef}
            style={{ height: '180px', padding: '16px' }}
            key={`${ item } key ${ index }`}>{item.source + index}</div>;
        } else {
          return <div style={{ height: '180px', padding: '16px' }}
            key={`${ item } key ${ index }`}>
            {item.source + index}
          </div>;
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </>
  );
}
