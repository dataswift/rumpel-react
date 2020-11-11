import { BundleStructure } from "@dataswift/hat-js/lib/interfaces/bundle.interface";

const TEST_PROFILE_BUNDLE_STRUCTURE: BundleStructure = {
  name: 'phata',
  bundle: {
    profile: {
      endpoints: [
        {
          endpoint: 'rumpel/profile',
          mapping: {
            'photo.avatar': 'photo.avatar',
            'online.website': 'online.website',
            'personal.firstName': 'personal.firstName',
            'online.facebook': 'online.facebook',
          }
        }
      ],
      orderBy: 'dateCreated',
      ordering: 'descending',
      limit: 1
    },
    notables: {
      endpoints: [
        {
          endpoint: 'rumpel/notablesv1',
          mapping: {
            kind: 'kind',
            photo: 'photov1',
            author: 'authorv1',
            shared: 'shared',
            message: 'message',
            location: 'locationv1',
            shared_on: 'shared_on',
            created_time: 'created_time',
            public_until: 'public_until',
            updated_time: 'updated_time',
            currently_shared: 'currently_shared'
          },
          filters: [
            {
              field: 'shared',
              operator: {
                value: true,
                operator: 'contains'
              }
            },
            {
              field: 'shared_on',
              operator: {
                value: 'phata',
                operator: 'contains'
              }
            }
          ]
        }
      ],
      orderBy: 'updated_time',
      ordering: 'descending'
    }
  }
};

export default TEST_PROFILE_BUNDLE_STRUCTURE;
