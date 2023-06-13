import {
  RentTitleValidation,
  RentDescriptionValidation,
  RentRatingValidation,
  RentRoomsValidation,
  RentGuestsValidation,
  RentPriceValidation,
  RentImagesValidation,
  RentFacilitiesValidation,
} from '@const/validation.js';
import { rentTypes } from '@appTypes/rent-type.type.js';
import { rentFacilities } from '@appTypes/rent-facility.type';

export const RentTitleError = {
  Min: `Минимальная длина поля Заголовок - ${ RentTitleValidation.Min } символов`,
  Max: `Максимальная длина поля Заголовок - ${ RentTitleValidation.Max } символов`,
} as const;

export const RentDescriptionError = {
  Min: `Минимальная длина поля Описание - ${ RentDescriptionValidation.Min } символов`,
  Max: `Максимальная длина поля Описание - ${ RentDescriptionValidation.Max } символов`,
} as const;

export const RentRatingError = {
  Int: 'Рейтинг должен быть целым числом',
  Min: `Минимальное значение Рейтинга - ${ RentRatingValidation.Min }`,
  Max: `Максимальное значение Рейтинга - ${ RentRatingValidation.Max }`,
} as const;

export const RentRoomsError = {
  Int: 'Количество Комнат должно быть целым числом',
  Min: `Минимальное количество Комнат - ${ RentRoomsValidation.Min }`,
  Max: `Максимальное количество Комнат - ${ RentRoomsValidation.Max }`,
} as const;

export const RentGuestsError = {
  Int: 'Количество Гостей должно быть целым числом',
  Min: `Минимальное количество Гостей - ${ RentGuestsValidation.Min }`,
  Max: `Максимальное количество Гостей - ${ RentGuestsValidation.Max }`,
} as const;

export const RentPriceError = {
  Int: 'Цена должна быть целым числом',
  Min: `Минимальная Цена - ${ RentPriceValidation.Min }`,
  Max: `Максимальное Цена - ${ RentPriceValidation.Max }`,
} as const;

export const RentCityError = {
  IsMongoId: 'Id Города должен быть валидным MongoId',
} as const;

export const RentAuthorError = {
  IsMongoId: 'Id Автора должен быть валидным MongoId',
} as const;

export const RentPreviewError = {
  IsUrl: 'В превью должна быть ссылка на изображение',
} as const;

export const RentImagesError = {
  IsUrl: 'В поле Изображения должен быть массив ссылок на изображения',
  IsArray: 'В поле Изображения должен быть массив ссылок на изображения',
  ArrayLength: `Количество Изображений должно быть ${ RentImagesValidation.Min }`,
} as const;

export const RentPremiumError = {
  IsBoolean: 'Поле Премиум должно быть выбрано',
} as const;

export const RentTypeError = {
  IsIn: `Тип объявления не входит в список разрешенных: ${ rentTypes.join(',') }`,
} as const;

export const RentFacilitiesError = {
  IsArray: `В поле Удобства должен быть массив из удобств: ${ rentFacilities.join(', ') }`,
  IsIn: `Удобства не входят в список разрешенных: ${ rentFacilities.join(', ') }`,
  ArrayMinLength: `Минимальное количество удобств - ${ RentFacilitiesValidation.Min }`
} as const;

