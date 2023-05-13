export const rentTypes = [ 'apartment', 'house', 'room', 'hotel' ] as const;

export type RentType = typeof rentTypes[number];
