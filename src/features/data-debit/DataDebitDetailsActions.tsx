import React from 'react';
import { useDispatch } from 'react-redux';

import ActionMenu from '../../components/Menus/ActionMenu';
import FormatMessage from '../messages/FormatMessage';
import { disableDataDebit } from './dataDebitSlice';

const DataDebitDetailsActions: React.FC<{ active: boolean; dataDebitId: string }> = ({ active, dataDebitId }) => {
  const dispatch = useDispatch();
  const disableApp = () => dispatch(disableDataDebit(dataDebitId));

  return (
    <ActionMenu showOptions={active}>
      <button onClick={disableApp} className="actions-menu-item">
        <i className="material-icons">link_off</i> <FormatMessage id="ds.hat.dataDebits.actions.disconnect" />
      </button>
    </ActionMenu>
  );
};

export default DataDebitDetailsActions;
