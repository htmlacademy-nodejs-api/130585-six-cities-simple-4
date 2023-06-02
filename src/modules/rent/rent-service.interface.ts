import { DocumentType } from '@typegoose/typegoose';

import CreateRentDto from '@modules/rent/dto/create-rent.dto.js';
import { RentEntity } from '@modules/rent/rent.entity.js';

export interface RentServiceInterface {
  create(dto: CreateRentDto): Promise<DocumentType<RentEntity>>;
  findById(rentId: string): Promise<DocumentType<RentEntity> | null>;
}
