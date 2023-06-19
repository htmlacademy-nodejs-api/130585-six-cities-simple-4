import { Expose } from 'class-transformer';

export default class LoginUserRdo {
  @Expose()
  public token!: string;

  @Expose()
  public email!: string;
}
