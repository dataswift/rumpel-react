import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import format from 'date-fns/format';

import DetailsHeader from '../../components/headers/DetailsHeader/DetailsHeader';
import InformationDetails from '../../components/InformationDetails/InformationDetails';
import { HatTool } from './hat-tool.interface';
import { getToolById, selectToolById, connectTool } from './toolsSlice';
import ToolDetailsactions from './ToolDetailsActions';
import FormatMessage from '../messages/FormatMessage';

enum HatToolStatus {
  RUNNING = 'running',
  UNTOUCHED = 'untouched',
}

const getToolStatus = (toolEnabled: boolean) => (toolEnabled ? HatToolStatus.RUNNING : HatToolStatus.UNTOUCHED);
const getToolStatusIcon = (toolEnabled: boolean): string => (toolEnabled ? 'check_circle' : 'add_circle_outline');
const getToolStatusText = (toolEnabled: boolean) =>
  toolEnabled ? <FormatMessage id="ds.hat.tool.actions.active" /> : <FormatMessage id="ds.hat.tool.actions.connect" />;

const getToolDetails = (tool: HatTool): Array<{ [key: string]: string }> => {
  const { name, url, country } = tool.developer;
  const { version, termsUrl, supportContact } = tool.info;

  return [
    { provider: name },
    { website: url },
    { country: country },
    { version: version },
    { 'last updated': format(new Date(tool.info.versionReleaseDate || ''), 'dd/MM/yyyy') },
    { 'terms and conditions': termsUrl },
    { 'support email': supportContact },
  ];
};

const ToolDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { toolId } = useParams<{ toolId: string }>();
  const tool = useSelector(selectToolById(toolId));

  const onConnectClick = () => dispatch(connectTool(toolId));

  useEffect(() => {
    if (!tool) dispatch(getToolById(toolId));
  }, [dispatch, tool, toolId]);

  if (!tool) return null;

  return (
    <>
      <DetailsHeader
        logoSrc={tool.info.graphics.logo.normal}
        logoAltText="Tool Logo"
        backgroundColor="rgba(43, 49, 61, 0.7)"
        isTool
        toolbarActions={<ToolDetailsactions setup={tool.status.enabled} toolId={tool.id} />}
      >
        <h3 className="app-details-header-title">{tool.info.name}</h3>

        <div
          onClick={onConnectClick}
          className={`app-details-status ${getToolStatus(tool.status.enabled)} link-button`}
        >
          <i className="material-icons details-button-icon">{getToolStatusIcon(tool.status.enabled)}</i>
          {getToolStatusText(tool.status.enabled)}
        </div>
      </DetailsHeader>

      <InformationDetails
        header={'Tool Info'}
        description={tool.info.description.text}
        screenshots={tool.info.graphics.screenshots.map((screenshot) => screenshot.normal)}
        informationListData={getToolDetails(tool)}
      />
    </>
  );
};

export default ToolDetails;
