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
    const name = getParameterByName('name')?.toLowerCase();
    const redirect = getParameterByName('redirect');

    if (!name) {
      dispatch(setRedirectError('application_misconfigured', 'name_is_required '));
      return;
    }

    if (!redirect) {
      dispatch(setRedirectError('application_misconfigured', 'redirect_is_required '));
      return;
    }

    dispatch(getApplicationsHmi(name));

  }, [dispatch]);

  return <>{props.children}</>;
};
