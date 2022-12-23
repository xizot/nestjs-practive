import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
export class TodoDto {
  @Expose()
  @IsNotEmpty()
  id: string;

  @Expose()
  title: string;

  @Expose()
  isDone: boolean;

  @Expose()
  @Transform(({ obj }) => obj.isDone)
  status?: string;

  @Expose()
  createdAt: Date;
}
