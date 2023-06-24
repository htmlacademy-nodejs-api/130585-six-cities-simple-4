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
  return properties
    .forEach((property) => {
      const transformFn = (target: UnknownRecord) => {
        const path = DEFAULT_STATIC_IMAGES.includes(String(target[property])) ? staticPath : uploadPath;

        target[property] = `${ path }/${ target[property] }`;
      };

      transformObjectProperty(property, data, transformFn);
    });
}
