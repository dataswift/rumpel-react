import React from "react";
import { HmiType } from "../hmi/hmi.interface";
import { useDispatch, useSelector } from "react-redux";
import { onTermsAgreed, onTermsDeclined } from "./hatSetupLoginSlice";
import { selectParentApp } from "../hmi/hmiSlice";
import { HmiActions } from "../hmi/HmiActions";

export const HatSetupLoginHmiActions: React.FC = () => {
  const dispatch = useDispatch();
  const parentApp = useSelector(selectParentApp);

  return (
    <>
      <HmiActions
        registrationType={HmiType.daas}
        nextStep={() => dispatch(onTermsAgreed(parentApp?.application.id || ''))}
        cancelStep={() => dispatch(onTermsDeclined())}
      />
    </>
  );
};
