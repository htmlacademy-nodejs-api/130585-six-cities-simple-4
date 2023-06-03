import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { RentServiceInterface } from '@modules/rent/rent-service.interface.js';
import { RentEntity } from '@modules/rent/rent.entity.js';
import { AppComponent } from '@appTypes/app-component.enum.js';
import { LoggerInterface } from '@core/logger/logger.interface.js';
import CreateRentDto from '@modules/rent/dto/create-rent.dto.js';

@injectable()
export class RentService implements RentServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.RentModel) private readonly rentModel: types.ModelType<RentEntity>,
  ) {}

  public async create(dto: CreateRentDto): Promise<DocumentType<RentEntity>> {
    const createdRent = await this.rentModel.create(dto);

    this.logger.info(`Создано новое объявление: ${createdRent.title}`);

    return createdRent;
  }

  public async findById(rentId: string): Promise<DocumentType<RentEntity> | null> {
    return this.rentModel.findById(rentId).populate(['author', 'city']).exec();
  }
}
