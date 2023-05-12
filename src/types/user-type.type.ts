export const userTypes = [ 'general', 'pro' ] as const;

export type UserType = typeof userTypes[number];
