import React from 'react';

const ChangePassword = React.lazy(
  () =>
    import(
      /* webpackChunkName: "change_password" */
      './ChangePassword'
    ),
);

export default ChangePassword;
