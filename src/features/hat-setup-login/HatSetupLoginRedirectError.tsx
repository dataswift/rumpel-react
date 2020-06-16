import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectRedirectError } from "./hatSetupLoginSlice";
import { getParameterByName } from "../../utils/query-params";
import { environment } from "../../environment";

type Props = {
    children: React.ReactNode;
}
export const HatSetupLoginRedirectError: React.FC<Props> = props => {
  const [redirectNotProvided, setRedirectNotProvided] = useState(false);
  const redirectError = useSelector(selectRedirectError);

  useEffect(() => {
    const callBackUrlWithError = (error: string, errorReason: string): string | null => {
      const redirect = getParameterByName('redirect_uri') ||
          getParameterByName('fallback') ||
          getParameterByName('redirect');

      if (redirect) {
        const url = `${ redirect }?error=${ error }%26error_reason=${ errorReason }`;

        return url.replace('#', '%23');
      } else {
        return null;
      }
    };

    if (redirectError && redirectError.error) {
      const fallback = getParameterByName('fallback');
      const internal = getParameterByName('internal') === 'true';

      const redirectWithError = callBackUrlWithError(redirectError.error, redirectError.errorReason);

      if (!redirectWithError) {
        setRedirectNotProvided(true);
        return;
      }

      if (internal) {
        window.location.href = fallback || redirectWithError;
      } else {
        window.location.href = redirectWithError;
      }
    }
  }, [redirectError]);

  const RedirectError = () => {
    if (environment.sandbox) {
      return (<div>
        <div className="app-error">
          <h3 className="app-error-header">Ooops... Looks like something went wrong.</h3>
          <p className="app-error-text">
                ERROR: App details incorrect. "redirect_uri" query parameter is missing. <br />
            <a href={'https://docs.dataswift.io/guides/hat-login/02-send-hat-login'}
              target="_blank"
              rel="noopener noreferrer">
                  Learn more
            </a>
          </p>
        </div>
      </div>
      );
    } else {
      return (<div>
        <div className="app-error">
          <h3 className="app-error-header">Ooops... Looks like something went wrong.</h3>
          <p className="app-error-text">
            ERROR: App details incorrect. Please contact the app developer and let them know.
          </p>
        </div>
      </div>
      );
    }
  };

  return <>{redirectNotProvided ? <RedirectError /> : props.children}</>;
};
