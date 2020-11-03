import { HatRecord } from '@dataswift/hat-js/lib/interfaces/hat-record.interface';
import { Profile } from '../features/profile/profile.interface';

const TEST_PROFILE: HatRecord<Profile> = {
  endpoint: 'rumpel/profile',
  recordId: '12345',
  data: {
    about: { body: '', title: '' },
    address: { city: '', county: '', country: '' },
    contact: { mobile: '', landline: '', primaryEmail: '', alternativeEmail: '' },
    dateCreated: 1586992748,
    emergencyContact: { mobile: '', lastName: '', firstName: '', relationship: '' },
    online: {
      blog: 'https://test-blog.com',
      google: '',
      twitter: '',
      website: 'https://test-website.com',
      youtube: '',
      facebook: '',
      linkedin: ''
    },
    personal: {
      title: 'Mr',
      gender: 'male',
      ageGroup: '',
      lastName: 'TestLastName',
      nickName: 'TestNickName',
      firstName: 'TestFirstName',
      preferredName: '',
      middleName: 'TestMiddleName',
      birthDate: '',
    },
    photo: { avatar: 'avatarTestPath' },
    shared: false,
  },
};

export default TEST_PROFILE;
