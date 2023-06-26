/* TS loader supports ts-node/esm and paths in tsconfig  */
import {pathToFileURL} from 'node:url';
import {resolve as resolveTs} from 'ts-node/esm';
import * as tsConfigPaths from 'tsconfig-paths';

let matchPath;

try {
  const {absoluteBaseUrl, paths} = tsConfigPaths.loadConfig();
  matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

} catch (e) {
  if (e.toString() !== 'TypeError: Cannot convert undefined or null to object') {
    throw e;
  }
}

export function resolve(specifier, ctx, defaultResolve) {
  let match = matchPath && matchPath(specifier);

  if (specifier.endsWith('.js')) {
    const trimmed = specifier.substring(0, specifier.length - 3);
    const matchedPath = matchPath && matchPath(trimmed);

    match = matchedPath ? `${matchedPath}.js` : undefined;
  }

  return match
    ? resolveTs(pathToFileURL(`${match}`).href, ctx, defaultResolve)
    : resolveTs(specifier, ctx, defaultResolve);
}

export {getFormat, load, transformSource} from 'ts-node/esm';
