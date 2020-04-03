import { flatten, uniqBy, values } from 'lodash';
import { EndpointQuery, PropertyQuery } from '@dataswift/hat-js/lib/interfaces/bundle.interface';

export const unbundle = (bundle: {
  [bundleVersion: string]: PropertyQuery;
}): { title: string; fields: string[]; expanded?: boolean }[] => {
  // Get a nested array of EndpointQueries
  const arr: EndpointQuery[][] = values(bundle).map((propertyQuery: PropertyQuery) => propertyQuery.endpoints);

  // Reformat for easy parsing in the template
  return flatten(arr).map((endpointQuery: EndpointQuery) => {
    return {
      title: endpointQuery.endpoint.replace('/', ' '),
      fields: endpointQuery.mapping
        ? uniqBy(Object.keys(endpointQuery.mapping), (path) => path.split('.')[0]).map((name) =>
            name.replace(/_/g, ' '),
          )
        : ['NONE'],
    };
  });
};
