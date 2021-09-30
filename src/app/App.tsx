import React from 'react';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';
import AppRouter from './AppRouter';
import Root from './Root';
import { config } from '../app.config';
import MatomoAnalyticsPlugin from '../components/MatomoAnalyticsPlugin/MatomoAnalyticsPlugin';

const instance = createInstance({
  urlBase: config.matomoUrl,
  siteId: config.matomoSiteId,
  disabled: process.env.NODE_ENV !== 'production',
});

const App = () => {
  console.log('PDA Dashboard version:', config.version);

  return (
    <Root>
      <MatomoProvider value={instance}>
        <MatomoAnalyticsPlugin>
          <AppRouter />
        </MatomoAnalyticsPlugin>
      </MatomoProvider>
    </Root>
  );
};

export default App;
