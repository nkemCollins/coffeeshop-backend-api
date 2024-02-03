import { Expose } from 'class-transformer';
import { ObjectId } from 'typeorm';

export class UserDto {
  @Expose()
  id: ObjectId;

  @Expose()
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  admin: boolean;

  //   @Expose()
  //   password: string;
}
