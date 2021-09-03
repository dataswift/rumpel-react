export interface Profile {
  dateCreated: number;
  shared: boolean;
  photo: {
    avatar: string;
  };
  personal: {
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    preferredName: string;
    nickName: string;
    birthDate: string;
    gender: string;
    ageGroup: string;
  };
  contact: {
    primaryEmail: string;
    alternativeEmail: string;
    mobile: string;
    landline: string;
  };
  emergencyContact: {
    firstName: string;
    lastName: string;
    mobile: string;
    relationship: string;
  };
  address: {
    city: string;
    county: string;
    country: string;
  };
  about: {
    title: string;
    body: string;
  };
  online: {
    website: string;
    blog: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    google: string;
    youtube: string;
  };
}
