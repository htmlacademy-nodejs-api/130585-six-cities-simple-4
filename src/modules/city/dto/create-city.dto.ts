import { MinLength, IsIn, IsOptional, ValidateNested, IsLatitude, IsLongitude } from 'class-validator';
import { Type, Expose } from 'class-transformer';

import { CityNameValidation } from '@const/validation.js';
import { CityNameError, CityCoordsError } from '@const/error-messages.js';
import { cities } from '@appTypes/city.type.js';

class CreateCityCoordsDto {
  @Expose()
  @IsLatitude({ message: CityCoordsError.IsLatitude })
  public lat!: number;

  @Expose()
  @IsLongitude({ message: CityCoordsError.IsLongitude })
  public long!: number;
}

export default class CreateCityDto {
  @Expose()
  @MinLength(CityNameValidation.Min, { message: CityNameError.Min })
  @IsIn(cities, { message: CityNameError.IsIn })
  public name!: string;

  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateCityCoordsDto)
  public coords?: CreateCityCoordsDto;
}
