import React, { useEffect } from "react";
import { AnalyticsEvent, AnalyticsProvider } from "hmi";
import { config } from "../../app.config";
import { useMatomo } from "@datapunt/matomo-tracker-react";

const MatomoAnalyticsPlugin: React.FC = ({ children }) => {
  const { trackEvent, trackPageView } = useMatomo();

  const onClickEvent = (event: AnalyticsEvent) => {
    if (!config.matomoSiteId || !config.matomoUrl) return;

    if (!event.category) {
      // TODO: Generate the category dynamically from the location of the user.
      event.category = 'PDA Auth Landing page';
    }

    // This overrides and prevents PII information to be sent to the analytics tool.
    event.href = window.location.origin + window.location.pathname;
    trackEvent(event);
  };

  useEffect(() => {
    // This overrides and prevents PII information to be sent to the analytics tool.
    trackPageView({ href: window.location.origin + window.location.pathname });
  }, [trackPageView]);

  return (
    <AnalyticsProvider onClickEvent={(event => onClickEvent(event))}>
      {children}
    </AnalyticsProvider>
  );
};

export default MatomoAnalyticsPlugin;
