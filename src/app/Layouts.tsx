import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { Footer, IssuedBy } from 'hmi';
import { PrivateRoute } from './PrivateRoute';
import { PrivateSpace } from '../components/PrivateSpace/PrivateSpace';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../features/language/languageSlice';

interface CustomRouteProps extends RouteProps {
  newAuth?: boolean;
  issuedByFooter?: boolean;
  footerBackgroundColor?: string;
}

export const PrivateLayoutRoute: React.FC<CustomRouteProps> = ({
  children,
  issuedByFooter,
  footerBackgroundColor,
  ...rest
}) => {
  const language = useSelector(selectLanguage);

  return (
    <PrivateRoute {...rest}>
      <div>
        {children}
        {issuedByFooter ? (
          <IssuedBy
            language={language}
            wrapperStyles={footerBackgroundColor ? { backgroundColor: footerBackgroundColor } : {}}
          />
        ) : (
          <Footer
            language={language}
            wrapperStyles={footerBackgroundColor ? { backgroundColor: footerBackgroundColor } : {}}
          />
        )}
      </div>
    </PrivateRoute>
  );
};

export const LayoutRoute: React.FC<CustomRouteProps> = ({
  children,
  issuedByFooter,
  footerBackgroundColor,
  ...rest
}) => {
  const language = useSelector(selectLanguage);

  return (
    <Route {...rest}>
      <div>
        {children}
        {issuedByFooter ? (
          <IssuedBy
            language={language}
            wrapperStyles={footerBackgroundColor ? { backgroundColor: footerBackgroundColor } : {}}
          />
        ) : (
          <Footer
            language={language}
            wrapperStyles={footerBackgroundColor ? { backgroundColor: footerBackgroundColor } : {}}
          />
        )}
      </div>
    </Route>
  );
};

export const PrivateSpaceRoute: React.FC<CustomRouteProps> = ({
  children,
  issuedByFooter,
  footerBackgroundColor,
  ...rest
}) => {
  const language = useSelector(selectLanguage);

  return (
    <PrivateRoute {...rest}>
      <div>
        <PrivateSpace>
          <>
            {children}
            {issuedByFooter ? (
              <IssuedBy
                language={language}
                wrapperStyles={footerBackgroundColor ? { backgroundColor: footerBackgroundColor } : {}}
              />
            ) : (
              <Footer
                language={language}
                wrapperStyles={footerBackgroundColor ? { backgroundColor: footerBackgroundColor } : {}}
              />
            )}
          </>
        </PrivateSpace>
      </div>
    </PrivateRoute>
  );
};
