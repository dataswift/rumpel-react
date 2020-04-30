import React from "react";
import { HmiType } from "../hmi/hmi.interface";
import { HatSetupLoginHmiActions } from "./HatSetupLoginHmiActions";
import { useSelector } from "react-redux";
import { selectParentApp } from "../hmi/hmiSlice";
import { Hmi } from "../hmi/Hmi";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

export const HatSetupLoginHmi: React.FC = () => {
  const parentApp = useSelector(selectParentApp);

  if (!parentApp || parentApp.setup) return <LoadingSpinner loadingText={'Loading permissions'}/>;

  return (
    <div>
      <Hmi hmiType={HmiType.daas} />
      <HatSetupLoginHmiActions />
    </div>
  );
};
