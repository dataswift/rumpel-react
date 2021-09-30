import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import TileHeader from '../../components/headers/TileHeader/TileHeader';
import { getTools, selectTools } from './toolsSlice';
import Card from '../../components/Card/Card';
import { HatTool } from './hat-tool.interface';

const getToolStatusIcon = (tool: HatTool): string =>
  tool.status.enabled ? 'check_circle' : 'add_circle_outline';

const ToolsList: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tools = useSelector(selectTools);

  useEffect(() => {
    dispatch(getTools());
  }, [dispatch]);

  const onToolClick = (toolId: string) => history.push(`/tools/${toolId}`);

  return (
    <div>
      <TileHeader
        titleId="ds.hat.tools.header.title"
        icon="assessment"
        descriptionId="ds.hat.tools.header.description"
      />

      <div className="card-list">
        {tools.map((tool) => (
          <Card
            key={tool.id}
            onClick={() => onToolClick(tool.id)}
            imgSrc={tool.info.graphics.logo.normal}
            imgAltText="Tool Logo"
            name={tool.info.name}
            description={tool.info.headline}
            icon={getToolStatusIcon(tool)}
            linkText="View Tool"
          />
        ))}
      </div>
    </div>
  );
};

export default ToolsList;
