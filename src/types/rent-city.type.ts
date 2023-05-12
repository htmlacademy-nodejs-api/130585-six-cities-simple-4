export const rentCities = [ 'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf' ] as const;

export type RentCity = typeof rentCities[number];
