import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import { useHistory } from 'react-router';
import { getDataDebits, selectDataDebits } from './dataDebitSlice';
import TileHeader from '../../components/headers/TileHeader/TileHeader';
import Card from '../../components/Card/Card';

const getStatusText = (active: boolean, endDate?: string) => {
  if (active) return 'active';
  if (!endDate) return '';

  return `expired ${format(new Date(endDate), 'dd MMM yyyy h:mma')}`;
};

const DataDebits: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dataDebits = useSelector(selectDataDebits);

  useEffect(() => {
    dispatch(getDataDebits());
  }, [dispatch]);

  const onDataDebitClick = (dataDebitId: string) => {
    history.push(`/data-debit/${dataDebitId}`);
  };

  return (
    <div>
      <TileHeader
        titleId="ds.hat.dataDebits.header.title"
        icon="swap_horiz"
        descriptionId="ds.hat.dataDebits.header.description"
      />

      <div className="card-list">
        {dataDebits.map((dataDebit) => {
          const descriptionText = (
            <>
              <div className="card-headline">by {dataDebit.requestClientName}</div>
              <div className="card-headline-italicized">
                {getStatusText(dataDebit.active, dataDebit.end)}
              </div>
            </>
          );

          return (
            <Card
              key={dataDebit.dataDebitKey}
              onClick={() => onDataDebitClick(dataDebit.dataDebitKey)}
              imgSrc={dataDebit.requestClientLogoUrl}
              imgAltText="HAT Data Debit"
              name={dataDebit.dataDebitKey}
              description={descriptionText}
              linkText="View app"
            />
          );
        })}
      </div>
    </div>
  );
};

export default DataDebits;
