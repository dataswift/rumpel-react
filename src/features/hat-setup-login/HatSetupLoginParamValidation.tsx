import React, { useEffect } from "react";
import { getApplicationsHmi } from "../applications/applicationsSlice";
import { useDispatch } from "react-redux";
import { setRedirectError } from "./hatSetupLoginSlice";
import { getParameterByName } from "../../utils/query-params";

type Props = {
    children: React.ReactNode;
}
export const HatSetupLoginParamValidation: React.FC<Props> = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const applicationId = getParameterByName("application_id") || getParameterByName("name");
    const applicationIdSafe = applicationId?.toLowerCase();
    const redirect = getParameterByName('redirect_uri') || getParameterByName('redirect');

    if (!redirect) {
      dispatch(setRedirectError('application_misconfigured', 'redirect_is_required '));
      return;
    }

    if (!applicationIdSafe) {
      dispatch(setRedirectError('application_misconfigured', 'application_id_is_required '));
      return;
    }

    dispatch(getApplicationsHmi(applicationIdSafe));

  }, [dispatch]);

  return <>{props.children}</>;
};
