import React  from "react";
import dataRightsIcons from '../../../assets/images/hat-data-rights.png';

type Props = {
    dataFetched: boolean;
    filteredData: boolean;
}

export const FeedLoading: React.FC<Props> = ({ dataFetched, filteredData }) => {

  return (
    <div className="feedLoadingPage">
      <img className="feedLoadingLogo" src={dataRightsIcons} alt="HAT Data rights logo" />
      {dataFetched && (
        <>
          <div className="feedLoadingTitle">No items found</div>
          <div className="feedLoadingSubtitle">Connect Data Plugs to see your data in the feed</div>
        </>
      )}

      {!dataFetched && filteredData && (
        <div className="feedLoadingTitle">No results found for the selected dates</div>
      )}

      {!dataFetched && !filteredData && (
        <div className="feedLoadingTitle">Loading</div>
      )}
    </div>
  );
};
