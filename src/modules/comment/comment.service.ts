import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { CommentServiceInterface } from '@modules/comment/comment.service.interface.js';
import { CommentEntity } from '@modules/comment/comment.entity.js';
import CreateCommentDto from '@modules/comment/dto/create-comment.dto.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { AppComponent } from '@appTypes/app-component.enum.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);

    this.logger.info(`Создан новый комментарий к объявлению: ${comment.rentId}`);

    return comment.populate('author');
  }

  public async findByRentId(rentId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ rentId })
      .populate('author');
  }

  public async deleteByRentId(rentId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({ rentId })
      .exec();

    return result.deletedCount;
  }

  public async countRatingByRentId(rentId: string): Promise<number | null> {
    const objectRentId = new Types.ObjectId(rentId);
    const result = await this.commentModel.aggregate([
      {
        $match: {
          rentId: objectRentId,
        },
      },
      {
        $group: {
          _id: objectRentId,
          rating: { $avg: '$rating' },
        },
      },
      {
        $merge:  {
          into: 'rents',
          on: '_id',
          whenMatched: 'merge',
          whenNotMatched: 'discard',
        },
      },
    ]).exec();

    return result?.[0]?.rating ?? null;
  }
}
