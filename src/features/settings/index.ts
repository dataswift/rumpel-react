import React from 'react';

export const Settings = React.lazy(
  () =>
    import(
      /* webpackChunkName: "settings" */
      './Settings'
    ),
);
