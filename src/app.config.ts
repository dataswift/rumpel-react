import { environment } from './environment';

export const config = {
  version: '4.0.8.0',
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
    bestPractices: 'https://docs.dataswift.io/technology/why/security-best-practice',
    termsOfService: 'https://cdn.dataswift.io/legal/hat-owner-terms-of-service.pdf',
    privacyPolicy: 'https://cdn.dataswift.io/legal/dataswift-privacy-policy.pdf',
  },
  mainMenu: [
    { display: 'My digital life', icon: 'dashboard', link: '/feed', dataType: '', disable: '',
      description: 'My Digital Life' },

    { display: 'Map', icon: 'map', link: '/mashups', dataType: '', disable: '',
      description: 'See your feed correlated with the places you\'ve been too.' },

    { display: 'My public profile', icon: 'security', link: '/datastore', dataType: 'profile', disable: '',
      description: 'View and edit the details of your profile and decide' +
          ' what information is private and what is to be shared.' },

    { display: 'Tools & insights', icon: 'assessment', link: '/tools', dataType: '', disable: '',
      description: 'Tools and Insights are powered by the Smart HAT Engine (SHE)' },

    { display: 'Explore HAT apps', icon: 'touch_app', link: '/explore/App', dataType: '', disable: '',
      description: 'Explore all the apps available in the HAT ecosystem.' },

    { display: 'Data plugs', icon: 'settings_input_component', link: '/explore/DataPlug', dataType: '', disable: '',
      description: `Data comes into your HAT via data plugs.
    Click here to see what data plugs are available, and what data plugs are already connected.` },

    { display: 'Settings', icon: 'settings', link: '/settings', dataType: '', disable: '',
      description: 'Settings on the HAT' },
  ],
};
