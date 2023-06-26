import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { UserEntity } from '@modules/user/user.entity.js';
import CreateUserDto from '@modules/user/dto/create-user.dto.js';
import UpdateUserDto from '@modules/user/dto/update-user.dto.js';
import LoginUserDto from '@modules/user/dto/login-user.dto.js';
import { UserServiceInterface } from '@modules/user/user-service.interface.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { DEFAULT_USER_AVATAR_FILENAME } from '@modules/user/user.const.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {
  }

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity({ ...dto, avatar: DEFAULT_USER_AVATAR_FILENAME });
    user.setPassword(dto.pass, salt);

    const createdUser = await this.userModel.create(user);
    this.logger.info(`Создан новый пользователь: ${ user.email }`);

    return createdUser;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email });
  }

  public async findById(userId: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findById(userId).exec();
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  public async verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);

    if (!user || !user.verifyPassword(dto.pass, salt)) {
      return null;
    }

    return user;
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.userModel.exists({ _id: documentId })) !== null;
  }
}
