import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectRedirectError } from "./hatSetupLoginSlice";
import { getParameterByName } from "../../utils/query-params";

type Props = {
    children: React.ReactNode;
}
export const HatSetupLoginRedirectError: React.FC<Props> = props => {
  const redirectError = useSelector(selectRedirectError);

  useEffect(() => {
    const callBackUrlWithError = (error: string, errorReason: string): string => {
      const redirect = getParameterByName('redirect');

      const url = `${ redirect }?error=${ error }%26error_reason=${ errorReason }`;

      return url.replace('#', '%23');
    };

    if (redirectError && redirectError.error) {
      const fallback = getParameterByName('fallback');
      const internal = getParameterByName('internal') === 'true';

      if (internal) {
        window.location.href = fallback || callBackUrlWithError(redirectError.error, redirectError.errorReason);
      } else {
        window.location.href = callBackUrlWithError(redirectError.error, redirectError.errorReason);
      }
    }
  }, [redirectError]);

  return <>{props.children}</>;
};
