import { UserType } from './user-type.type.js';

export type User = {
  name: string;
  email: string;
  avatar?: string;
  type: UserType;
};
