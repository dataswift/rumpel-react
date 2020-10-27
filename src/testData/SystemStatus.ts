import { SystemStatusInterface } from '../features/system-status/system-status.interface';

const TEST_SYSTEM_STATUS: SystemStatusInterface[] = [
  {
    title: 'Database Storage Used',
    kind: { metric: '5', units: 'kB', kind: 'Numeric' },
  },
  {
    title: 'Database Storage',
    kind: { metric: '100', units: 'MB', kind: 'Numeric' },
  },
  {
    title: 'Database Storage Used Share',
    kind: { metric: '1', units: '%', kind: 'Numeric' },
  },
];

export default TEST_SYSTEM_STATUS;
