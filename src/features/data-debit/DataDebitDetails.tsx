import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import DetailsHeader from '../../components/headers/DetailsHeader/DetailsHeader';
import './DataDebitDetails.scss';
import InformationDetails from '../../components/InformationDetails/InformationDetails';
import { getDataDebits, selectDataDebitById } from "./dataDebitSlice";
import { unbundle } from "../../utils/unbundle";
import Card from "../../components/Card/Card";
import { format } from "date-fns";
import DataDebitDetailsActions from "./DataDebitDetailsActions";

const DataDebitDetails: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { dataDebitParam } = useParams<{ dataDebitParam: string }>();
  const dataDebit = useSelector(selectDataDebitById(dataDebitParam));
  const [requirements, setRequirements] = useState<{ title: string; fields: string[]; expanded?: boolean }[]>([]);

  useEffect(() => {
    if (!dataDebit) dispatch(getDataDebits());

    if (dataDebit?.permissionsLatest?.bundle) {
      setRequirements(unbundle(dataDebit.permissionsLatest?.bundle?.bundle));
    }
  }, [dispatch, dataDebit]);


  if (!dataDebit) return null;

  return (
    <>
      <DetailsHeader
        logoSrc={dataDebit.requestClientLogoUrl}
        logoAltText="Data Debit Logo"
        toolbarActions={<DataDebitDetailsActions active={dataDebit.active} dataDebitId={dataDebit.dataDebitKey} />}
        backgroundColor="rgba(43, 49, 61, 0.7)"
      >
        <h3 className="app-details-header-title">{dataDebit.dataDebitKey}</h3>

        <div className="app-details-header-headline">
            Details of your data debit agreement with the provider
        </div>
          
        <div className={`app-details-status ${dataDebit.active ? 'running' : 'in-active'} link-button`}>
          <i className="material-icons details-button-icon">
            {dataDebit.active ? 'fiber_manual_record' : 'radio_button_unchecked'}
          </i>
          {dataDebit.active ? 'Active' : 'In-active'}
        </div>
      </DetailsHeader>

      <div className={'debit-valitity-interval'}>
        <span>{format(new Date(dataDebit.start || ''), 'dd MMM yyyy')}</span>
        <i className={'material-icons'}>arrow_forward</i>
        <span>{dataDebit.end ? format(new Date(dataDebit.end || ''), 'dd MMM yyyy') : 'until cancelled'}</span>
      </div>

      <InformationDetails
        header={'Data Debit Info'}
        description={dataDebit.requestDescription}
        purpose={dataDebit.permissionsLatest?.purpose}
        requirements={requirements}
      />

      <div className={'data-debit-origin'}>
        <Card
          imgSrc={dataDebit.requestClientLogoUrl}
          imgAltText={'data debit'}
          name={dataDebit.requestClientName}
          description={'Created the data debit'}
          onClick={() => history.push(`/explore/App/${dataDebit.requestApplicationId}`)} />
      </div>
        
      {dataDebit.permissionsLatest?.termsUrl &&
        <a
          className={'data-debit-privacy-policy'}
          href={dataDebit.permissionsLatest?.termsUrl}
          rel="noopener noreferrer"
          target="_blank">
          Privacy policy
        </a>
      }
    </>
  );
};

export default DataDebitDetails;
