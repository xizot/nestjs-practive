import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/mysql/base.service';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';

interface ITodoService {
  findByUserId(userId: string): Promise<[TodoEntity[], number]>;
}

@Injectable()
export class TodoService
  extends BaseService<TodoEntity, Repository<TodoEntity>>
  implements ITodoService
{
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {
    super(todoRepository);
  }

  async findByUserId(userId: string): Promise<[TodoEntity[], number]> {
    return this.todoRepository.findAndCountBy({
      userId,
    });
  }
}
