import { DocumentType } from '@typegoose/typegoose';

import CreateCommentDto from '@modules/comment/dto/create-comment.dto.js';
import { CommentEntity } from '@modules/comment/comment.entity.js';

export interface CommentServiceInterface {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByRentId(rentId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByRentId(rentId: string): Promise<number | null>;
  countRatingByRentId(rentId: string): Promise<void>;
}
