import React from "react";
import './InformationDetails.scss';
import InfoList from "../InfoList/InfoList";
import FormatMessage from "../../features/messages/FormatMessage";

type Props = {
    header: string;
    description?: string;
    screenshots?: Array<string>;
    informationListData?: Array<{ [key: string]: string }>;
}

const InformationDetails: React.FC<Props> = ({ header, description, screenshots, informationListData }) => {
  return (
    <div className={'ds-information-details'}>
      <div className={'ds-information-details-header'}>
        {header}
      </div>
      {description &&
        <div className={'ds-information-details-section'}>
          <h5>
            <FormatMessage id={'ds.hat.application.details.description.title'} />
          </h5>
          <div className={'ds-information-details-section-description'}>
            {description}
          </div>
        </div>
      }

      {(screenshots && screenshots.length > 0) &&
        <div className={'ds-information-details-section'}>
          <h5>
            <FormatMessage id={'ds.hat.application.details.screenshots.title'} />
          </h5>
          <div className={'ds-information-details-section-screenshots'}>
            {screenshots.map((screenshot, index) => {
              return (
                <img key={'ds-app-screenshot' + index} src={screenshot} alt={'Screenshot'} />
              );
            })}
          </div>
        </div>
      }
      
      {informationListData && 
         <InfoList title={'Information'} data={informationListData} />
      }

    </div>
  );    
};

export default InformationDetails;
