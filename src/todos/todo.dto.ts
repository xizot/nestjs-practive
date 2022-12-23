import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
export class TodoDto {
  @Expose()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  title: string;

  @Expose()
  isDone: boolean;

  @Expose()
  @Transform(({ obj }) => obj.isDone)
  status?: string;
}
