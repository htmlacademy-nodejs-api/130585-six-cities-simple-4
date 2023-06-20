import {
  IsOptional,
  MinLength,
  MaxLength,
  IsInt,
  Min,
  Max,
  IsMongoId,
  IsArray,
  IsBoolean,
  ArrayMinSize,
  ArrayMaxSize,
  IsIn,
  Matches,
  ArrayUnique,
} from 'class-validator';
import { Expose } from 'class-transformer';

import { RentType, rentTypes } from '@appTypes/rent-type.type.js';
import { RentFacility, rentFacilities } from '@appTypes/rent-facility.type.js';
import {
  RentTitleValidation,
  RentDescriptionValidation,
  RentRoomsValidation,
  RentGuestsValidation,
  RentPriceValidation,
  RentImagesValidation,
  RentFacilitiesValidation,
  IMAGE_URL_MATCH_PATTERN,
} from '@const/validation.js';
import {
  RentTitleError,
  RentDescriptionError,
  RentRoomsError,
  RentGuestsError,
  RentPriceError,
  RentCityError,
  RentPreviewError,
  RentImagesError,
  RentPremiumError,
  RentTypeError,
  RentFacilitiesError,
} from '@const/error-messages.js';

export default class UpdateRentDto {
  @Expose()
  @IsOptional()
  @MinLength(RentTitleValidation.Min, { message: RentTitleError.Min })
  @MaxLength(RentTitleValidation.Max, { message: RentTitleError.Max })
  public title?: string;

  @Expose()
  @IsOptional()
  @MinLength(RentDescriptionValidation.Min, { message: RentDescriptionError.Min })
  @MaxLength(RentDescriptionValidation.Max, { message: RentDescriptionError.Max })
  public description?: string;

  @Expose()
  @IsOptional()
  @IsMongoId({ message: RentCityError.IsMongoId })
  public city?: string;

  @Expose()
  @IsOptional()
  @Matches(IMAGE_URL_MATCH_PATTERN, { message: RentPreviewError.IsImg })
  public preview?: string;

  @Expose()
  @IsOptional()
  @IsArray({ message: RentImagesError.IsArray })
  @ArrayMinSize(RentImagesValidation.Min, { message: RentImagesError.ArrayLength })
  @ArrayMaxSize(RentImagesValidation.Max, { message: RentImagesError.ArrayLength })
  @Matches(IMAGE_URL_MATCH_PATTERN, { each: true, message: RentImagesError.IsImg })
  @ArrayUnique({ message: RentImagesError.ArrayUnique })
  public images?: string[];

  @Expose()
  @IsOptional()
  @IsBoolean({ message: RentPremiumError.IsBoolean })
  public isPremium?: boolean;

  @Expose()
  @IsOptional()
  @IsIn(rentTypes, { message: RentTypeError.IsIn })
  public type?: RentType;

  @Expose()
  @IsOptional()
  @IsInt({ message: RentRoomsError.Int })
  @Min(RentRoomsValidation.Min, { message: RentRoomsError.Min })
  @Max(RentRoomsValidation.Max, { message: RentRoomsError.Max })
  public rooms?: number;

  @Expose()
  @IsOptional()
  @IsInt({ message: RentGuestsError.Int })
  @Min(RentGuestsValidation.Min, { message: RentGuestsError.Min })
  @Max(RentGuestsValidation.Max, { message: RentGuestsError.Max })
  public guests?: number;

  @Expose()
  @IsOptional()
  @IsInt({ message: RentPriceError.Int })
  @Min(RentPriceValidation.Min, { message: RentPriceError.Min })
  @Max(RentPriceValidation.Max, { message: RentPriceError.Max })
  public price?: number;

  @Expose()
  @IsOptional()
  @IsArray({ message: RentFacilitiesError.IsArray })
  @ArrayMinSize(RentFacilitiesValidation.Min, { message: RentFacilitiesError.ArrayMinLength })
  @IsIn(rentFacilities, { each: true, message: RentFacilitiesError.IsIn })
  @ArrayUnique({ message: RentFacilitiesError.ArrayUnique })
  public facilities?: RentFacility[];
}
