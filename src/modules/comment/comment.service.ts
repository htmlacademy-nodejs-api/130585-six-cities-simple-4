import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { CommentServiceInterface } from '@modules/comment/comment.service.interface.js';
import { CommentEntity } from '@modules/comment/comment.entity.js';
import CreateCommentDto from '@modules/comment/dto/create-comment.dto.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { Sort } from '@appTypes/sort.enum.js';
import { DEFAULT_COMMENTS_COUNT } from '@modules/comment/comment.const.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);

    this.logger.info(`Создан новый комментарий к объявлению: ${ comment.rentId }`);

    return comment.populate('author');
  }

  public async findByRentId(rentId: string, count?: number): Promise<DocumentType<CommentEntity>[]> {
    const limit = count ?? DEFAULT_COMMENTS_COUNT;

    return this.commentModel
      .find({ rentId }, {}, { limit })
      .sort({ createdAt: Sort.Down })
      .populate('author');
  }

  public async deleteByRentId(rentId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({ rentId })
      .exec();

    return result.deletedCount;
  }

  public async countRatingByRentId(rentId: string): Promise<void> {
    const objectRentId = new Types.ObjectId(rentId);

    await this.commentModel.aggregate([
      {
        $match: {
          rentId: objectRentId,
        },
      },
      {
        $group: {
          _id: objectRentId,
          avg: { $avg: '$rating' },
        },
      },
      {
        $project: {
          _id: '$_id',
          rating: { $round: [ '$avg', 1 ] },
        },
      },
      {
        $merge: {
          into: 'rents',
          on: '_id',
          whenMatched: 'merge',
          whenNotMatched: 'discard',
        },
      },
    ]).exec();
  }
}
