import { DocumentType } from '@typegoose/typegoose';

import CreateUserDto from '@modules/user/dto/create-user.dto.js';
import UpdateUserDto from '@modules/user/dto/update-user.dto.js';
import LoginUserDto from '@modules/user/dto/login-user.dto.js';
import { UserEntity } from '@modules/user/user.entity.js';
import { DocumentExistsInterface } from '@appTypes/document-exists.interface.js';

export interface UserServiceInterface extends DocumentExistsInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findById(userId: string): Promise<DocumentType<UserEntity> | null>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
  verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null>;
}
