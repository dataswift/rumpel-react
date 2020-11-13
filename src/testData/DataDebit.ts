import { DataDebit } from '@dataswift/hat-js/lib/interfaces/data-debit.interface';

export const EXPIRED_DATA_DEBIT: DataDebit = {
  dataDebitKey: 'TestExpiredDataDebit',
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

export const ACTIVE_DATA_DEBIT: DataDebit = {
  dataDebitKey: 'TestActiveDataDebit',
  dateCreated: '2019-04-12T11:21:22.205Z',
  permissions: [],
  requestClientName: 'TestClientName',
  requestClientLogoUrl: 'TestClientLogoUrl',
  requestClientUrl: 'TestClientUrl',
  requestDescription: 'TestClientDescription',
  start: '2019-04-12T11:21:22.205Z',
  permissionsLatest: {
    purpose: 'TestClientPurpose',
    dateCreated: '',
    start: '',
    period: 0,
    cancelAtPeriodEnd: false,
    termsUrl: '',
    accepted: true,
    active: true,
    bundle: {
      name: 'test-bundle',
      bundle: {
        profile: {
          endpoints: [
            {
              endpoint: 'test/profile',
              mapping: {
                name: 'test.name',
                photo: 'test.photo'
              }
            }
          ],
          orderBy:"dateCreated",
          ordering:"descending",
          limit:1
        }
      }
    }
  },
  active: true,
  accepted: true,
};

export default [ACTIVE_DATA_DEBIT, EXPIRED_DATA_DEBIT];
