import { SheFeed } from '../features/feed/she-feed.interface';

export const SheFeedItemTextOnly: SheFeed = {
  source: 'testsource',
  content: { text: 'Test content text' },
  date: { iso: '2020-11-16T18:00:00.000Z', unix: 1565117350 },
  location: {
    geo: {
      latitude: 51.51262,
      longitude: -0.130438,
    },
  },
  title: {
    text: 'Test Text Title',
    action: '',
  },
  types: [],
};

export const SheFeedItemTextAndImage: SheFeed = {
  source: 'testsource',
  content: {
    text: 'Test content text',
    media: [{ url: 'testurl' }],
  },
  date: { iso: '2020-11-16T18:00:00.000Z', unix: 1565117350 },
  location: {
    geo: {
      latitude: 51.51262,
      longitude: -0.130438,
    },
  },
  title: {
    text: 'Test Text Title',
    action: '',
  },
  types: [],
};

export const SheFeedItemTextAndLocation: SheFeed = {
  source: 'testsource',
  content: {
    text: 'Test content text',
  },
  date: { iso: '2020-11-16T18:00:00.000Z', unix: 1565117350 },
  location: {
    geo: {
      latitude: 51.51262,
      longitude: -0.130438,
    },
    address: {
      name: 'TestAddress',
      street: 'TestStreet',
    },
  },
  title: {
    text: 'Test Text Title',
    action: '',
  },
  types: [],
};
export const SheFeedItemWeeklySummary: SheFeed = {
  source: 'she',
  content: {
    text: 'Twitter: Tweets sent: 1 ',
    nestedStructure: {
      twitter: [
        {
          content: 'Test twitter',
          badge: '1',
        },
      ],
      facebook: [
        {
          content: 'Test facebook',
          badge: '3',
        },
      ],
    },
  },
  date: { iso: '2020-11-16T18:00:00.000Z', unix: 1565117350 },
  location: {
    geo: {
      latitude: 51.51262,
      longitude: -0.130438,
    },
  },
  title: {
    text: 'Your recent activity summary',
    subtitle: '11 April 20:23 - 07 August 15:41 GMT',
    action: 'insight',
  },
  types: ['insight', 'activity'],
};
