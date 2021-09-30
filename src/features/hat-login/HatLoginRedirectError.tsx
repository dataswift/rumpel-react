import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as queryString from 'query-string';
import { selectRedirectError } from './hatLoginSlice';
import { environment } from '../../environment';

type Props = {
  children: React.ReactNode;
};

type Query = {
  redirect_uri?: string;
  redirect?: string;
  fallback?: string;
  internal?: string;
};

const HatLoginRedirectError: React.FC<Props> = (props) => {
  const [redirectNotProvided, setRedirectNotProvided] = useState(false);
  const redirectError = useSelector(selectRedirectError);

  useEffect(() => {
    const { redirect_uri, redirect, fallback, internal } = queryString.parse(
      window.location.search,
    ) as Query;

    const callBackUrlWithError = (error: string, errorReason: string): string | null => {
      const redirectParam = redirect_uri || redirect;

      if (fallback) {
        return fallback;
      }

      if (redirectParam) {
        const url = `${redirectParam}?error=${error}%26error_reason=${errorReason}`;

        return url.replace('#', '%23');
      }
      return null;
    };

    if (redirectError && redirectError.error) {
      const isInternal = internal === 'true';

      const redirectWithError = callBackUrlWithError(
        redirectError.error,
        redirectError.errorReason,
      );

      if (!redirectWithError) {
        setRedirectNotProvided(true);
        return;
      }

      if (isInternal) {
        window.location.href = `${window.location.origin}/feed`;
      } else {
        window.location.href = redirectWithError;
      }
    }
  }, [redirectError]);

  const RedirectError = () => {
    if (environment.sandbox) {
      return (
        <div>
          <div className="app-error">
            <h3 className="app-error-header">Ooops... Looks like something went wrong.</h3>
            <p className="app-error-text">
              ERROR: App details incorrect. &quot;redirect_uri&quot; query parameter is missing.
              <br />
              <a
                href="https://docs.dataswift.io/guides/hat-login/02-send-hat-login"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more
              </a>
            </p>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="app-error">
          <h3 className="app-error-header">Ooops... Looks like something went wrong.</h3>
          <p className="app-error-text">
            ERROR: App details incorrect. Please contact the app developer and let them know.
          </p>
        </div>
      </div>
    );
  };

  return <>{redirectNotProvided ? <RedirectError /> : props.children}</>;
};

export default HatLoginRedirectError;
