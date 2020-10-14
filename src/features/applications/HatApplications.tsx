import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TileHeader from '../../components/headers/TileHeader/TileHeader';
import ApplicationList from '../../components/lists/ApplicationList';
import { getApplications, selectApplications } from './applicationsSlice';

const HATApplications: React.FC = () => {
  const dispatch = useDispatch();
  const apps = useSelector(selectApplications);

  React.useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  const onAppClick = (appId: string) => {
    // TODO add navigation when page exists.
  };

  return (
    <>
      <TileHeader
        titleId="ds.hat.applications.header.title"
        icon="touch_app"
        descriptionId="ds.hat.applications.header.description"
      />
      <ApplicationList hatApps={apps} onAppClick={onAppClick} />
    </>
  );
};

export default HATApplications;
