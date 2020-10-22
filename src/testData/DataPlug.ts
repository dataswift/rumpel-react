import { HatApplication } from '@dataswift/hat-js/lib/interfaces/hat-application.interface';

const TEST_DATA_PLUG: HatApplication = {
  active: true,
  application: {
    id: '2',
    developer: {
      country: 'United Kingdom',
      id: 'dataswift',
      name: 'Dataswift Ltd',
      url: 'https://dataswift.io',
    },
    kind: {
      androidUrl: '',
      iosUrl: '',
      kind: 'DataPlug',
      url: '',
    },
    dependencies: {
      tools: [],
      plugs: [],
      contracts: []
    },
    info: {
      dataPreview: [],
      dataUsePurpose: 'Test data use purpose',
      description: { text: 'Test description', html: '', markdown: '' },
      graphics: { logo: { normal: '' }, banner: { normal: '' }, screenshots: [] },
      headline: 'The Test Data Plug',
      name: 'Test Data Plug',
      published: true,
      rating: { score: 'A*BA', points: 19 },
      supportContact: '',
      termsUrl: '',
      updateNotes: {
        header: 'We’ve made clear your legal rights over your data …eX+privacy+policy+2.1.pdf) to continue using HAT.',
        notes: Array(9),
      },
      version: '1.2.6',
    },
    permissions: {
      rolesGranted: [
        {
          role: "namespacewrite",
          detail: "testnamespace"
        }
      ]
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
      url: 'https://setup-url.dataswift.io',
      onboarding: [],
    }
  },
  enabled: true,
  needsUpdating: false,
  setup: true,
};

export default TEST_DATA_PLUG;
