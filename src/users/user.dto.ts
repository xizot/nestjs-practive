import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/common/base.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends BaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  password: string;

  firstName: string;
  lastName: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.firstName + ' ' + obj.lastName)
  @Expose()
  fullname: string;
}
