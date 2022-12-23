import { Expose } from 'class-transformer';
export class UserDto {
  @Expose()
  email: string;
  password: string;

  @Expose()
  fullname: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  age: number;
}
