import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { TodoModule } from './todos/todo.module';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { NoteModule } from './note/note.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    DatabaseModule,
    TodoModule,
    UserModule,
    AuthModule,
    NoteModule,
  ],
})
export class AppModule {}
