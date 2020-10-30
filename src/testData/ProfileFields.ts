const TEST_PROFILE_FIELDS = [
  {
    name: 'firstName',
    id: 'firstName',
    placeholder: 'First name',
    type: 'text',
  },
  {
    name: 'lastName',
    id: 'lastName',
    placeholder: 'Last name',
    type: 'text',
  },
  {
    name: 'gender',
    id: 'gender',
    placeholder: 'Gender',
    type: 'menu',
    options: [
      'Male',
      'Female',
      'Decline to state'
    ]
  },
  {
    name: 'birthDate',
    id: 'birthDate',
    placeholder: 'Birthday',
    type: 'DatePicker'
  },
  {
    name: 'primaryEmail',
    id: 'primaryEmail',
    placeholder: 'Primary email',
    type: 'email'
  },
  {
    name: 'alternativeEmail',
    id: 'alternativeEmail',
    placeholder: 'Alternative email',
    type: 'email'
  },
  {
    name: 'mobile',
    id: 'mobile',
    placeholder: 'Mobile phone number',
    type: 'text'
  },
  {
    name: 'landline',
    id: 'landline',
    placeholder: 'Home phone number',
    type: 'text'
  }
];

export default TEST_PROFILE_FIELDS;
