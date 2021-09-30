import React from 'react';
import { useDispatch } from 'react-redux';

import { disconnectTool } from './toolsSlice';
import ActionMenu from '../../components/Menus/ActionMenu';
import FormatMessage from '../messages/FormatMessage';

const ToolDetailsActions: React.FC<{ setup: boolean; toolId: string }> = ({ setup, toolId }) => {
  const dispatch = useDispatch();
  const onDisconnect = () => dispatch(disconnectTool(toolId));

  return (
    <ActionMenu showOptions={setup}>
      <button onClick={onDisconnect} className="actions-menu-item">
        <i className="material-icons">link_off</i>{' '}
        <FormatMessage id="ds.hat.tool.actions.disconnect" />
      </button>
    </ActionMenu>
  );
};

export default ToolDetailsActions;
