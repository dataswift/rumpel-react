import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import TileHeader from '../../components/headers/TileHeader/TileHeader';
import { getApplications, selectApplicationsByKind } from '../applications/applicationsSlice';
import ApplicationList from '../applications/ApplicationList';

const DataPlugs: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const apps = useSelector(selectApplicationsByKind('DataPlug'));

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  const onAppClick = (appId: string) => {
    history.push(`/explore/DataPlug/${appId}`);
  };

  return (
    <>
      <TileHeader
        titleId="ds.hat.dataplugs.header.title"
        icon="settings_input_component"
        descriptionId="ds.hat.dataplugs.header.description"
      />
      <ApplicationList hatApps={apps} onAppClick={onAppClick} />
    </>
  );
};

export default DataPlugs;
