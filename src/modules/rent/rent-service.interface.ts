import { DocumentType } from '@typegoose/typegoose';

import CreateRentDto from '@modules/rent/dto/create-rent.dto.js';
import UpdateRentDto from '@modules/rent/dto/update-rent.dto.js';
import { RentEntity } from '@modules/rent/rent.entity.js';

export interface RentServiceInterface {
  create(dto: CreateRentDto): Promise<DocumentType<RentEntity>>;
  findById(rentId: string): Promise<DocumentType<RentEntity> | null>;
  find(): Promise<DocumentType<RentEntity>[]>;
  deleteById(rentId: string): Promise<DocumentType<RentEntity> | null>;
  updateById(rentId: string, dto: UpdateRentDto): Promise<DocumentType<RentEntity> | null>;
  findByCityId(cityId: string, count?: number): Promise<DocumentType<RentEntity>[]>;
  incCommentCount(rentId: string): Promise<DocumentType<RentEntity> | null>;
  findTopRated(count?: number): Promise<DocumentType<RentEntity>[]>;
  findPopular(count?: number): Promise<DocumentType<RentEntity>[]>;
  exists(documentId: string): Promise<boolean>;
}
