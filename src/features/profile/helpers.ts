import { Profile, ProfileSharingConfig } from "./profile.interface";
import { BundleStructure, PropertyQuery } from "@dataswift/hat-js/lib/interfaces/bundle.interface";
import { DEFAULT_PHATA_BUNDLE } from "./profileSlice";

export const generatePhataBundle = (
  profile: ProfileSharingConfig, 
  previousBundle: BundleStructure
): { [bundleVersion: string]: PropertyQuery } => {
  const mapping = Object.keys(profile).reduce((acc: Record<string, string>, grouping) => {
    if (profile.hasOwnProperty(grouping) && typeof profile[grouping] === 'object') {
      const sharedFields = Object.keys(profile[grouping]).filter(field => profile[grouping][field] === true);
      sharedFields.forEach(field => acc[`${grouping}.${field}`] = `${grouping}.${field}`);
    }

    return acc;
  }, {});

  const profileIsShared = Object.keys(mapping).length > 0;

  if (profileIsShared) {
    return {
      notables: DEFAULT_PHATA_BUNDLE.bundle.notables,
      profile: {
        endpoints: [{
          endpoint: 'rumpel/profile',
          mapping: Object.keys(mapping).length > 0 ? mapping : undefined
        }],
        orderBy: 'dateCreated',
        ordering: 'descending',
        limit: 1
      }
    };
  } else {
    return { notables: previousBundle.bundle.notables };
  }
};


export const generateProfileShare = (
  profile: Profile, 
  phataBundle: BundleStructure
): ProfileSharingConfig => {
  let bundleMapping: Array<any>;

  if (phataBundle.bundle?.profile?.endpoints[0].mapping) {
    bundleMapping = Object.keys(phataBundle.bundle.profile.endpoints[0].mapping);
  } else {
    bundleMapping = [];
  }

  return Object.keys(profile).reduce((acc1: Record<string, object>, grouping) => {
    if (profile.hasOwnProperty(grouping) && typeof profile[grouping] === 'object') {
      acc1[grouping] = Object.keys(profile[grouping]).reduce((acc2: Record<string, boolean>, field) => {
        if (profile[grouping].hasOwnProperty(field)) {
          acc2[field] = bundleMapping.includes(`${grouping}.${field}`);
        }

        return acc2;
      }, {});
    }

    return acc1;
  }, {}) as ProfileSharingConfig;
};
