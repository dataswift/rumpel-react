import { HatTool } from '../features/tools/hat-tool.interface';

const TEST_HAT_TOOL: HatTool = {
  dataBundle: { name: 'test-feed-counter', bundle: {} },
  developer: {
    id: 'test dev',
    name: 'Test Developer',
    url: 'https://test.com',
    country: 'United Kingdom',
  },
  id: 'test-feed-counter',
  info: {
    version: '1.0.0',
    versionReleaseDate: '2018-01-01T12:00:00.000Z',
    name: 'Test Tool',
    headline: 'A tool for testing',
    description: { text: 'Test Description', markdown: '', html: '' },
    termsUrl: '',
    supportContact: 'contact@test.com',
    graphics: {
      banner: { normal: '' },
      logo: { normal: '' },
      screenshots: [],
    },
    dataPreviewEndpoint: '/testpath',
  },
  status: { available: true, enabled: true },
  trigger: { period: '', triggerType: '' },
};

export default TEST_HAT_TOOL;
