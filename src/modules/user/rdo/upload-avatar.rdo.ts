import { Expose } from 'class-transformer';

export default class UploadAvatarRdo {
  @Expose()
  public avatar!: string;
}
