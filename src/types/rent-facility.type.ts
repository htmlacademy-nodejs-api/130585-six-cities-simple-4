export const rentFacilities = [ 'Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge' ] as const;

export type RentFacility = typeof rentFacilities[number];
