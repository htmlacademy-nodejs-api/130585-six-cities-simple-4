import { City } from '@appTypes/city.type.js';
import { RentType } from '@appTypes/rent-type.type.js';
import { RentFacility } from '@appTypes/rent-facility.type.js';

export default class CreateRentDto {
  public title!: string;
  public description!: string;
  public createdAt!: Date;
  public city!: City;
  public preview!: string;
  public images!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public type!: RentType | undefined;
  public rooms!: number;
  public guests!: number;
  public price!: number;
  public facilities!: RentFacility[];
  public author!: string;
}
