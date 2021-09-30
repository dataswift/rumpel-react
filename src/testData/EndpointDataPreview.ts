import { HatRecord } from '@dataswift/hat-js/lib/interfaces/hat-record.interface';

const TEST_ENDPOINT_DATA_PREVIEW: Record<string, Array<HatRecord<any>>> = {
  'testNamespace/testEndpoint': [
    {
      endpoint: 'testNamespace/testEndpoint',
      recordId: 'recordId',
      data: {
        value: 'Test Data Value',
        anotherValue: 'Test Another Data Value',
      },
    },
  ],
};

export default TEST_ENDPOINT_DATA_PREVIEW;
