import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from 'src/config/db.config';
import { UserEntity } from 'src/users/user.entity';
import { TodoEntity } from './../todos/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConfig.databaseConnection,
      host: dbConfig.databaseHost,
      port: dbConfig.databasePort,
      username: dbConfig.databaseUsername,
      password: dbConfig.databasePassword,
      database: dbConfig.databaseName,
      entities: [TodoEntity, UserEntity],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
