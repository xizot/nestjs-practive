import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
export class UserDto {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @Expose()
  fullname: string;

  @ApiProperty({
    required: false,
  })
  @Expose()
  phoneNumber: string;

  @ApiProperty({
    required: false,
  })
  @Expose()
  age: number;
}
