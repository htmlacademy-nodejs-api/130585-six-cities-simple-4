import { DEFAULT_USER_AVATAR_FILENAME } from '@modules/user/user.const.js';
import { DEFAULT_RENT_PREVIEW_FILENAME } from '@modules/rent/rent.const.js';

export const enum DBAuthSource {
  Admin = 'admin',
}

export const enum DBRetry {
  Count = 5,
  Timeout = 1000,
}

export const DEFAULT_STATIC_IMAGES = [
  DEFAULT_USER_AVATAR_FILENAME,
  DEFAULT_RENT_PREVIEW_FILENAME,
];

export const STATIC_FIELDS = [
  'avatar',
  'preview',
];
