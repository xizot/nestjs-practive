import { BaseEntity } from 'src/common/mysql/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  fullname: string;

  @Column({
    nullable: true,
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column({
    nullable: true,
  })
  age: number;

  @Column({
    nullable: true,
  })
  refreshToken: string;
}
