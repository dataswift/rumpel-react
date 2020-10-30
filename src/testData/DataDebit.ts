import { DataDebit } from '@dataswift/hat-js/lib/interfaces/data-debit.interface';

export const EXPIRED_DATA_DEBIT: DataDebit = {
  dataDebitKey: 'Test Expired Data Debit',
  dateCreated: '2017-12-11T13:54:02+0000',
  permissions: [],
  requestClientName: 'TestClientName',
  requestClientLogoUrl: 'TestClientLogoUrl',
  requestClientUrl: 'TestClientUrl',
  start: '2017-12-11T13:55:20.000Z',
  end: '2017-12-12T13:55:20.000Z',
  active: false,
  accepted: true,
};

const ACTIVE_DATA_DEBIT: DataDebit = {
  dataDebitKey: 'Test Active Data Debit',
  dateCreated: '2019-04-12T11:21:22.205Z',
  permissions: [],
  requestClientName: 'TestClientName',
  requestClientLogoUrl: 'TestClientLogoUrl',
  requestClientUrl: 'TestClientUrl',
  start: '2019-04-12T11:21:22.205Z',
  active: true,
  accepted: true,
};

export default [ACTIVE_DATA_DEBIT, EXPIRED_DATA_DEBIT];
