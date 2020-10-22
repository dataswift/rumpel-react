import React from 'react';

export const HatTools = React.lazy(
  () =>
    import(
      /* webpackChunkName: "tools-list" */
      './ToolsList'
    ),
);
