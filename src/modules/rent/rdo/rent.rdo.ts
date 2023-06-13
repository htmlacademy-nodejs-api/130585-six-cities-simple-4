import { Expose, Type } from 'class-transformer';

import CityRdo from '@modules/city/rdo/city.rdo.js';
import UserRdo from '@modules/user/rdo/user.rdo.js';

export default class RentRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public createdAt!: string;

  @Expose()
  @Type(() => CityRdo)
  public city!: CityRdo;

  @Expose()
  public preview!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public rooms!: number;

  @Expose()
  public guests!: number;

  @Expose()
  public price!: number;

  @Expose()
  public commentCount!: number;

  @Expose()
  public facilities!: string[];

  @Expose()
  @Type(() => UserRdo)
  public author!: UserRdo;
}
