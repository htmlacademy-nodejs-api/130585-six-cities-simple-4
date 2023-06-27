import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { RentServiceInterface } from '@modules/rent/rent-service.interface.js';
import { RentEntity } from '@modules/rent/rent.entity.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import CreateRentDto from '@modules/rent/dto/create-rent.dto.js';
import UpdateRentDto from '@modules/rent/dto/update-rent.dto.js';
import { Sort } from '@appTypes/sort.enum.js';
import { RentDefault } from '@modules/rent/rent.const.js';

@injectable()
export class RentService implements RentServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.RentModel) private readonly rentModel: types.ModelType<RentEntity>,
  ) {
  }

  public async create(dto: CreateRentDto): Promise<DocumentType<RentEntity>> {
    const createdRent = await this.rentModel.create({ ...dto, preview: RentDefault.Preview });

    this.logger.info(`Создано новое объявление: ${ createdRent.title }`);

    return createdRent;
  }

  public async findById(rentId: string): Promise<DocumentType<RentEntity> | null> {
    return this.rentModel
      .findById(rentId)
      .populate([ 'author', 'city' ])
      .exec();
  }

  public async find(): Promise<DocumentType<RentEntity>[]> {
    return this.rentModel
      .find()
      .sort({ createdAt: Sort.Down })
      .populate([ 'author', 'city' ])
      .exec();
  }

  public async deleteById(rentId: string): Promise<DocumentType<RentEntity> | null> {
    return this.rentModel
      .findByIdAndDelete(rentId)
      .exec();
  }

  public async updateById(rentId: string, dto: UpdateRentDto): Promise<DocumentType<RentEntity> | null> {
    return this.rentModel
      .findByIdAndUpdate(rentId, dto, {
        new: true,
        runValidators: true,
      })
      .populate([ 'author', 'city' ])
      .exec();
  }

  public async findByCityId(citId: string, count?: number): Promise<DocumentType<RentEntity>[]> {
    const limit = count ?? RentDefault.Count;

    return this.rentModel
      .find({ city: citId }, {}, { limit })
      .populate([ 'author', 'city' ])
      .exec();
  }

  public async incCommentCount(rentId: string): Promise<DocumentType<RentEntity> | null> {
    return this.rentModel
      .findByIdAndUpdate(rentId, {
        '$inc': {
          commentCount: 1,
        }
      })
      .exec();
  }

  public async findTopRated(count?: number): Promise<DocumentType<RentEntity>[]> {
    const limit = count ?? RentDefault.TopRatedCount;

    return this.rentModel
      .find()
      .sort({ rating: Sort.Down })
      .limit(limit)
      .populate([ 'author', 'city' ])
      .exec();
  }

  public async findPopular(count?: number): Promise<DocumentType<RentEntity>[]> {
    const limit = count ?? RentDefault.PopularCount;

    return this.rentModel
      .find()
      .sort({ commentCount: Sort.Down })
      .limit(limit)
      .populate([ 'author', 'city' ])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.rentModel.exists({ _id: documentId })) !== null;
  }
}
