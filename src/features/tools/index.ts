import React from 'react';

export const HatTools = React.lazy(
  () =>
    import(
      /* webpackChunkName: "tools-list" */
      './ToolsList'
    ),
);

export const HatToolDetails = React.lazy(
  () =>
    import(
      /* webpackChunkName: "tool-details" */
      './ToolDetails'
    ),
);
