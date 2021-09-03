import { FormFields } from '../../components/form/formFields.interface';
import {
  profileAboutValidations,
  profileContactValidations,
  profileInfoValidations,
  profileOnlineValidations,
} from './validations';

export interface ProfileFieldsInterface {
  id: string;
  validations: Record<string, string>;
  fields: Array<FormFields>;
}

export interface ProfileSectionInterface {
  sectionId: string;
  title: string;
  groupFields: Array<ProfileFieldsInterface>;
}

const ProfileSections: Array<ProfileSectionInterface> = [
  {
    sectionId: 'personalSection',
    title: 'Personal Info',
    groupFields: [
      {
        id: 'personal',
        validations: profileInfoValidations,
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
            options: ['male', 'female'],
          },
          {
            name: 'birthDate',
            id: 'birthDate',
            placeholder: 'Birthday',
            type: 'DatePicker',
          },
        ],
      },
      {
        id: 'contact',
        validations: profileContactValidations,
        fields: [
          {
            name: 'primaryEmail',
            id: 'primaryEmail',
            placeholder: 'Primary email',
            type: 'email',
          },
          {
            name: 'alternativeEmail',
            id: 'alternativeEmail',
            placeholder: 'Alternative email',
            type: 'email',
          },
          {
            name: 'mobile',
            id: 'mobile',
            placeholder: 'Mobile phone number',
            type: 'text',
          },
          {
            name: 'landline',
            id: 'landline',
            placeholder: 'Home phone number',
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    sectionId: 'onlineSection',
    title: 'Online',
    groupFields: [
      {
        id: 'online',
        validations: profileOnlineValidations,
        fields: [
          {
            name: 'facebook',
            id: 'facebook',
            placeholder: 'Facebook profile',
            type: 'text',
          },
          {
            name: 'twitter',
            id: 'twitter',
            placeholder: 'Twitter profile',
            type: 'text',
          },
          {
            name: 'linkedin',
            id: 'linkedin',
            placeholder: 'Linkedin',
            type: 'text',
          },
          {
            name: 'youtube',
            id: 'youtube',
            placeholder: 'Youtube',
            type: 'text',
          },
          {
            name: 'website',
            id: 'website',
            placeholder: 'Website',
            type: 'text',
          },
          {
            name: 'blog',
            id: 'blog',
            placeholder: 'Blog',
            type: 'text',
          },
          {
            name: 'google',
            id: 'google',
            placeholder: 'Google',
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    sectionId: 'aboutSection',
    title: 'About',
    groupFields: [
      {
        id: 'about',
        validations: profileAboutValidations,
        fields: [
          {
            name: 'title',
            id: 'title',
            placeholder: 'Title',
            type: 'text',
          },
          {
            name: 'body',
            id: 'body',
            placeholder: 'Say something nice about yourself for the world to see',
            type: 'text',
          },
        ],
      },
    ],
  },
];

export default ProfileSections;
