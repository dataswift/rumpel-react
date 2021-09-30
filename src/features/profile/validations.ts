export const profileInfoValidations = {
  firstName: 'optional|name|min-length:1|max-length:30',
  lastName: 'optional|name|min-length:1|max-length:30',
  gender: 'optional|options:male,female',
  birthDate: 'optional|date-format:dd/MM/yyyy',
};

export const profileContactValidations = {
  primaryEmail: 'optional|email',
  alternativeEmail: 'optional|email',
  mobile: 'optional|number',
  landline: 'optional|number',
};

export const profileOnlineValidations = {
  facebook: 'optional|url',
  twitter: 'optional|url',
  linkedin: 'optional|url',
  youtube: 'optional|url',
  website: 'optional|url',
  blog: 'optional|url',
  google: 'optional|url',
};

export const profileAboutValidations = {
  title: 'optional',
  body: 'optional',
};
