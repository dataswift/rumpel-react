import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';

const TEST_HAT_APPLICATION: HatApplication = {
  active: true,
  application: {
    id: '1',
    developer: {
      country: 'United Kingdom',
      id: 'dataswift',
      name: 'Dataswift Ltd',
      url: 'https://dataswift.io',
    },
    kind: {
      androidUrl: '',
      iosUrl: '',
      kind: 'App',
      url: '',
    },
    info: {
      dataPreview: [],
      dataUsePurpose: '',
      description: { text: 'Test description', html: '', markdown: '' },
      graphics: { logo: { normal: '' }, banner: { normal: '' }, screenshots: [] },
      headline: 'The Test Application',
      name: 'Test Application',
      published: true,
      rating: { score: '', points: 1 },
      supportContact: '',
      termsUrl: '',
      updateNotes: {
        header: 'We’ve made clear your legal rights over your data …eX+privacy+policy+2.1.pdf) to continue using HAT.',
        notes: Array(9),
      },
      version: '1.2.6',
    },
    status: {
      expectedStatus: 0,
      statusUrl: '',
      compatibility: '1.0.0',
      dataPreviewEndpoint: '',
      kind: '',
      recentDataCheckEndpoint: '',
      versionReleaseDate: '2019-01-15T12:00:00.000Z',
    },
    setup: {
      iosUrl: '',
      kind: '',
      url: '',
      onboarding: [],
    },
    permissions: {
      rolesGranted: [],
    },
  },
  enabled: true,
  needsUpdating: false,
  setup: true,
};

export default TEST_HAT_APPLICATION;
