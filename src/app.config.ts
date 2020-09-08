import { environment } from './environment';

export const config = {
  version: '4.0.9.0',
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
};
