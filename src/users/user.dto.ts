import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserBaseDto {
  @ApiProperty()
  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class UserDto extends UserBaseDto {
  @ApiProperty()
  @Expose()
  fullname: string;

  @ApiProperty({ required: false })
  @Expose()
  phoneNumber: string;

  @ApiProperty({ required: false })
  @Expose()
  age: number;

  @Expose()
  createdAt: Date;
}

export class UsersDto {
  @Type(() => UserDto)
  @Expose()
  users: UserDto[];
}
