import { BaseEntity } from 'src/common/mysql/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'todos',
})
export class TodoEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({
    default: false,
  })
  isDone: boolean;
}
