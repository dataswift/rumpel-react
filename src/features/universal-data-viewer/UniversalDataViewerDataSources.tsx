import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSources, selectDataSources } from './universalDataViewerSlice';
import './UniversalDataViewer.scss';
import { Link } from 'react-router-dom';
import TileHeader from '../../components/headers/TileHeader/TileHeader';

type Props = {
  namespace: string;
  endpoints: string[];
};

const UniversalDataViewerDataSourcesListItem: React.FC<Props> = ({ namespace, endpoints }) => {
  return (
    <div className={'universal-data-viewer-list-item'}>
      <div className={'universal-data-viewer-list-item-title'}>{namespace}</div>
      <div className={'universal-data-viewer-list-item-endpoints'}>
        {endpoints.map((endpoint) => (
          <Link
            to={{
              pathname: `/universal-data-viewer/${namespace}/${endpoint}`,
              state: { namespace: namespace, endpoint: endpoint },
            }}
            key={`/universal-data-viewer/${namespace}/${endpoint}`}
            className={'universal-data-viewer-list-item-endpoints-item'}
          >
            {endpoint}
          </Link>
        ))}
      </div>
    </div>
  );
};

const UniversalDataViewerDataSources: React.FC = () => {
  const dataSources = useSelector(selectDataSources);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dataSources) {
      dispatch(getDataSources());
    }
  }, [dispatch, dataSources]);

  if (!dataSources) return null;

  return (
    <div className={'universal-data-viewer'}>
      <TileHeader
        titleId="ds.hat.universal-data-viewer.header.title"
        icon="pageview"
        descriptionId="ds.hat.universal-data-viewer.header.description"
      />
      <div className={'universal-data-viewer-list'}>
        {Object.entries(dataSources).map(([key, value], index) => {
          return (
            <UniversalDataViewerDataSourcesListItem
              key={`${key}-${value}-${index}`}
              namespace={key}
              endpoints={value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UniversalDataViewerDataSources;
