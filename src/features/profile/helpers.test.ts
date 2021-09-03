import { generatePhataBundle, generateProfileShare } from './helpers';
import TEST_PROFILE_SHARING_CONFIG from '../../testData/ProfileSharingConfig';
import { DEFAULT_PHATA_BUNDLE } from './profileSlice';
import TEST_PROFILE from '../../testData/Profile';
import TEST_PROFILE_BUNDLE_STRUCTURE from '../../testData/ProfileBundleStructure';

describe('Profile Helpers', () => {
  test('Generate Phata Bundle returns the correct bundle', () => {
    const bundle = generatePhataBundle(TEST_PROFILE_SHARING_CONFIG, DEFAULT_PHATA_BUNDLE);

    expect(bundle).toEqual(TEST_PROFILE_BUNDLE_STRUCTURE.bundle);
  });

  test('Generate Profile Share returns the correct object', () => {
    const profileShare = generateProfileShare(TEST_PROFILE, TEST_PROFILE_BUNDLE_STRUCTURE);

    expect(profileShare).toEqual(TEST_PROFILE_SHARING_CONFIG);
  });
});
