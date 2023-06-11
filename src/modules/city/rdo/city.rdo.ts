import { Expose, Type } from 'class-transformer';

export class CityCoordsRdo {
  @Expose()
  public lat!: number;

  @Expose()
  public long!: number;
}

export default class CityRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  @Type(() => CityCoordsRdo)
  public coords?: CityCoordsRdo;
}
