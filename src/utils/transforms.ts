import { UnknownRecord } from '@appTypes/unknown-record.type.js';
import { DEFAULT_STATIC_IMAGES } from '@const/db.js';
import { isUnknownRecord } from '@utils/index.js';

export function transformObjectProperty(
  property: string,
  someObject: UnknownRecord,
  transformFn: (target: UnknownRecord) => void
) {
  return Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFn(someObject);
      } else {
        const possibleObj = someObject[key];

        if (isUnknownRecord(possibleObj)) {
          transformObjectProperty(property, possibleObj, transformFn);
        }
      }
    });
}

export function transformObjectStaticPaths(properties: string[], staticPath: string, uploadPath: string, data: UnknownRecord) {
  const getItemPath = (item: string) => `${ DEFAULT_STATIC_IMAGES.includes(item) ? staticPath : uploadPath }/${ item }`;

  return properties
    .forEach((property) => {
      const transformFn = (target: UnknownRecord) => {
        const value = target[property];

        if (Array.isArray(value)) {
          target[property] = value.map((item) => getItemPath(String(item)));

        } else {
          target[property] = getItemPath(String(value));
        }
      };

      transformObjectProperty(property, data, transformFn);
    });
}
