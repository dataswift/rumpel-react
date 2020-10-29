import { FormFields } from "../../components/form/formFields.interface";

export interface ProfileFieldsInterface {
  id: string;
  title: string;
  fields: Array<FormFields>;
}
const ProfileFields: Array<ProfileFieldsInterface> = [
  {
    id: 'personal',
    title: 'Personal Info',
    fields: [
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
        placeholder: 'Birth date',
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
    ]
  },
  {
    id: 'online',
    title: 'Online',
    fields: [
      {
        name: 'facebook',
        id: 'facebook',
        placeholder: 'Facebook profile',
        type: 'text'
      },
      {
        name: 'twitter',
        id: 'twitter',
        placeholder: 'Twitter profile',
        type: 'text'
      },
      {
        name: 'Linkedin',
        id: 'Linkedin',
        placeholder: 'Linkedin',
        type: 'text'
      },
      {
        name: 'youtube',
        id: 'youtube',
        placeholder: 'Youtube',
        type: 'text'
      },
      {
        name: 'website',
        id: 'website',
        placeholder: 'Website',
        type: 'text'
      },
      {
        name: 'blog',
        id: 'blog',
        placeholder: 'Blog',
        type: 'text'
      },
      {
        name: 'google',
        id: 'google',
        placeholder: 'Google',
        type: 'text'
      }
    ]
  },
  {
    id: 'about',
    title: 'About',
    fields: [
      {
        name: 'title',
        id: 'title',
        placeholder: 'Title',
        type: 'text'
      },
      {
        name: 'body',
        id: 'body',
        placeholder: 'Say something nice about yourself for the world to see',
        type: 'text'
      }
    ]
  }
];

export default ProfileFields;
