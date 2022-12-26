import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class TodoBaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  title: string;

  @Expose()
  isDone: boolean;
}

export class TodoDto extends TodoBaseDto {
  @Expose()
  id: string;
  @Expose()
  userId: string;
}

export class TodoCreateReqDto extends TodoBaseDto {}

export class TodoUpdateReqDto extends TodoBaseDto {}

export class TodosDto {
  @Type(() => TodoDto)
  @Expose()
  data: TodoDto[];

  @Expose()
  totalCount: number;
}
