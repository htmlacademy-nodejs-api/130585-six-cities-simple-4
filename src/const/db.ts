import { UserDefault } from '@modules/user/user.const.js';
import { RentDefault } from '@modules/rent/rent.const.js';

export const enum DBAuthSource {
  Admin = 'admin',
}

export const enum DBRetry {
  Count = 5,
  Timeout = 1000,
}

export const DEFAULT_STATIC_IMAGES = [
  String(UserDefault.Avatar),
  String(RentDefault.Preview),
];

export const STATIC_FIELDS = [
  'avatar',
  'preview',
  'images',
];
