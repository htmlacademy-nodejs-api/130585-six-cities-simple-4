import { Length,IsMongoId, IsInt, Max, Min } from 'class-validator';

import { CommentTextValidation, RentRatingValidation } from '@const/validation.js';
import { CommentTextError, CommentRentIdError, RentRatingError } from '@const/error-messages.js';

export default class CreateCommentDto {
  @Length(CommentTextValidation.Min, CommentTextValidation.Max, { message: CommentTextError.Length })
  public text!: string;

  @IsMongoId({ message: CommentRentIdError.IsMongoId })
  public rentId!: string;

  public author!: string;

  @IsInt({ message: RentRatingError.Int })
  @Min(RentRatingValidation.Min, { message: RentRatingError.Min })
  @Max(RentRatingValidation.Max, { message: RentRatingError.Max })
  public rating!: number;
}
