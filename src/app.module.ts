import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { TodosModule } from './todos/todos.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [PostModule, UserModule, TodosModule],
})
export class AppModule {}
