import { environment } from './environment';

const externalLinks = {
  bestPractices: 'https://docs.dataswift.io/guides/security-requirement-best-practice#password-policy',
  termsOfService: 'https://cdn.dataswift.io/legal/hat-owner-terms-of-service.pdf',
  privacyPolicy: 'https://cdn.dataswift.io/legal/dataswift-privacy-policy.pdf',
};

export const config = {
  version: '4.2.0',
  name: environment.appName,
  tokenApp: environment.tokenName,
  tokenExpiryTime: 3,
  supportedDomains: ['.hubofallthings.net', '.hubat.net', '.hat.direct', '.dataswift.me', '.dataswift.dev'],
  supportedPorts: [3000, 9000, 9001],
  acceptedLanguages: ['en', 'pl', 'pt'],
  defaultLanguage: 'en',
  native: environment.native,
  protocol: environment.protocol,
  links: {
    bestPractices: externalLinks.bestPractices,
    termsOfService: externalLinks.termsOfService,
    privacyPolicy: externalLinks.privacyPolicy,
    hatters: environment.hattersUrl,
  },
  mainMenu: [
    {
      display: 'My digital life',
      icon: 'dashboard',
      link: '/feed',
      external: false,
      dataType: '',
      disable: '',
      description: 'My Digital Life',
    },

    {
      display: 'Map',
      icon: 'map',
      link: '/mashups',
      dataType: '',
      external: true,
      disable: '',
      description: "See your feed correlated with the places you've been too.",
    },

    {
      display: 'My public profile',
      icon: 'security',
      link: '/datastore',
      external: true,
      dataType: 'profile',
      disable: '',
      description:
        'View and edit the details of your profile and decide' +
        ' what information is private and what is to be shared.',
    },

    {
      display: 'Tools & insights',
      icon: 'assessment',
      link: '/tools',
      external: true,
      dataType: '',
      disable: '',
      description: 'Tools and Insights are powered by the Smart HAT Engine (SHE)',
    },

    {
      display: 'Explore HAT apps',
      icon: 'touch_app',
      link: '/explore/App',
      external: false,
      dataType: '',
      disable: '',
      description: 'Explore all the apps available in the HAT ecosystem.',
    },

    {
      display: 'Data plugs',
      icon: 'settings_input_component',
      link: '/explore/DataPlug',
      external: false,
      dataType: '',
      disable: '',
      description: `Data comes into your HAT via data plugs.
    Click here to see what data plugs are available, and what data plugs are already connected.`,
    },

    {
      display: 'Universal Data Viewer',
      icon: 'pageview',
      link: '/universal-data-viewer',
      external: false,
      dataType: '',
      disable: '',
      description: `Universal Data Viewer`,
    },

    {
      display: 'Settings',
      icon: 'settings',
      link: '/settings',
      dataType: '',
      external: false,
      disable: '',
      description: 'Settings on the HAT',
    },
  ],
  settingsMenu: [
    { display: 'Change password', icon: 'keyboard_arrow_right', link: '/user/password/change', description: '' },

    { display: 'Tech support', icon: 'exit_to_app', link: 'mailto:contact@dataswift.io', description: '' },

    { display: 'Terms of Service', icon: 'exit_to_app', link: externalLinks.termsOfService, description: '' },

    { display: 'Privacy policy', icon: 'exit_to_app', link: externalLinks.privacyPolicy, description: '' },

    { display: 'Join the HAT Community', icon: 'exit_to_app', link: 'https://www.hatcommunity.org', description: '' },

    {
      display: 'Your HAT functionality level is 4 (learn more)',
      icon: 'exit_to_app',
      link: externalLinks.privacyPolicy,
      description: '',
    },
  ],
  settingsPrivateDataMenu: [
    { display: 'Profile', icon: 'keyboard_arrow_right', link: '/datastore', description: '' },
    { display: 'Data Debits', icon: 'keyboard_arrow_right', link: '/data-debit', description: '' },
  ],
};
