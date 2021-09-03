const TEST_PROFILE_SHARING_CONFIG = {
  photo: {
    avatar: true,
  },
  personal: {
    title: false,
    firstName: true,
    middleName: false,
    lastName: false,
    preferredName: false,
    nickName: false,
    birthDate: false,
    gender: false,
    ageGroup: false,
  },
  contact: {
    primaryEmail: false,
    alternativeEmail: false,
    mobile: false,
    landline: false,
  },
  emergencyContact: {
    firstName: false,
    lastName: false,
    mobile: false,
    relationship: false,
  },
  address: {
    city: false,
    county: false,
    country: false,
  },
  about: {
    title: false,
    body: false,
  },
  online: {
    website: true,
    blog: false,
    facebook: true,
    twitter: false,
    linkedin: false,
    google: false,
    youtube: false,
  },
};

export default TEST_PROFILE_SHARING_CONFIG;
