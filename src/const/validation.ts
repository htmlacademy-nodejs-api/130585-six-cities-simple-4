export const enum UserNameValidation {
  Min = 1,
  Max = 15,
}

export const enum UserPassValidation {
  Min = 6,
  Max = 12,
}

export const enum RentTitleValidation {
  Min = 10,
  Max = 100,
}

export const enum RentDescriptionValidation {
  Min = 20,
  Max = 1024,
}

export const enum RentDaysValidation {
  Before = 10,
}

export const enum RentRatingValidation {
  Min = 1,
  Max = 5,
}

export const enum RentRoomsValidation {
  Min = 1,
  Max = 8,
}

export const enum RentGuestsValidation {
  Min = 1,
  Max = 10,
}

export const enum RentPriceValidation {
  Min = 100,
  Max = 10000,
}

export const enum RentImagesValidation {
  Min = 6,
  Max = 6,
}

export const enum RentFacilitiesValidation {
  Min = 1,
}

export const enum CommentTextValidation {
  Min = 5,
  Max = 1024,
}

export const enum CityNameValidation {
  Min = 1,
}

export const IMAGE_URL_MATCH_PATTERN = /\.(jpg|jpeg|png)(\?(.*))?$/gmi;
export const IMAGE_EXT_MATCH_PATTERN = /^(jpeg|png)$/;
export const IMAGE_MAX_SIZE = 5 * 1024 * 1024;
