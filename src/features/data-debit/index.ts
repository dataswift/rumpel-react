import React from 'react';

const DataDebits = React.lazy(
  () =>
    import(
      /* webpackChunkName: "data-debits" */
      './DataDebits'
    ),
);

export default DataDebits;
