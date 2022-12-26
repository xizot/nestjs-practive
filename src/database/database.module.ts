import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { UserEntity } from 'src/users/user.entity';
import { TodoEntity } from './../todos/todo.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
        entities: [TodoEntity, UserEntity],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
