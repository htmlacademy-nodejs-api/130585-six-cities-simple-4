import { Length, IsMongoId, IsInt, Max, Min } from 'class-validator';
import { Expose } from 'class-transformer';

import { CommentTextValidation, RentRatingValidation } from '@const/validation.js';
import { CommentTextError, CommentRentIdError, RentRatingError } from '@const/error-messages.js';

export default class CreateCommentDto {
  @Expose()
  @Length(CommentTextValidation.Min, CommentTextValidation.Max, { message: CommentTextError.Length })
  public text!: string;

  @Expose()
  @IsMongoId({ message: CommentRentIdError.IsMongoId })
  public rentId!: string;

  public author!: string;

  @Expose()
  @IsInt({ message: RentRatingError.Int })
  @Min(RentRatingValidation.Min, { message: RentRatingError.Min })
  @Max(RentRatingValidation.Max, { message: RentRatingError.Max })
  public rating!: number;
}
