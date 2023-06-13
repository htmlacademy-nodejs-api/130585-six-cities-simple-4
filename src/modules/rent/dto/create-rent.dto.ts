import { MinLength, MaxLength, IsInt, Min, Max, IsMongoId, IsUrl, IsArray, IsBoolean, ArrayMinSize, ArrayMaxSize, IsIn } from 'class-validator';

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
} from '@const/validation.js';
import {
  RentTitleError,
  RentDescriptionError,
  RentRoomsError,
  RentGuestsError,
  RentPriceError,
  RentCityError,
  RentAuthorError,
  RentPreviewError,
  RentImagesError,
  RentPremiumError,
  RentTypeError,
  RentFacilitiesError,
} from '@const/error-messages.js';

export default class CreateRentDto {
  @MinLength(RentTitleValidation.Min, { message: RentTitleError.Min })
  @MaxLength(RentTitleValidation.Max, { message: RentTitleError.Max })
  public title!: string;

  @MinLength(RentDescriptionValidation.Min, { message: RentDescriptionError.Min })
  @MaxLength(RentDescriptionValidation.Max, { message: RentDescriptionError.Max })
  public description!: string;

  @IsMongoId({ message: RentCityError.IsMongoId })
  public city!: string;

  @IsUrl({}, { message: RentPreviewError.IsUrl })
  public preview!: string;

  @IsArray({ message: RentImagesError.IsArray })
  @ArrayMinSize(RentImagesValidation.Min, { message: RentImagesError.ArrayLength})
  @ArrayMaxSize(RentImagesValidation.Max, { message: RentImagesError.ArrayLength })
  @IsUrl({}, { each: true, message: RentImagesError.IsUrl })
  public images!: string[];

  @IsBoolean({ message: RentPremiumError.IsBoolean })
  public isPremium!: boolean;

  @IsIn(rentTypes, { message: RentTypeError.IsIn })
  public type!: RentType;

  @IsInt({ message: RentRoomsError.Int })
  @Min(RentRoomsValidation.Min, { message: RentRoomsError.Min })
  @Max(RentRoomsValidation.Max, { message: RentRoomsError.Max })
  public rooms!: number;

  @IsInt({ message: RentGuestsError.Int })
  @Min(RentGuestsValidation.Min, { message: RentGuestsError.Min })
  @Max(RentGuestsValidation.Max, { message: RentGuestsError.Max })
  public guests!: number;

  @IsInt({ message: RentPriceError.Int })
  @Min(RentPriceValidation.Min, { message: RentPriceError.Min })
  @Max(RentPriceValidation.Max, { message: RentPriceError.Max })
  public price!: number;

  @IsArray({ message: RentFacilitiesError.IsArray })
  @ArrayMinSize(RentFacilitiesValidation.Min, { message: RentFacilitiesError.ArrayMinLength })
  @IsIn(rentFacilities, { each: true, message: RentFacilitiesError.IsIn })
  public facilities!: RentFacility[];

  @IsMongoId({ message: RentAuthorError.IsMongoId })
  public author!: string;
}
