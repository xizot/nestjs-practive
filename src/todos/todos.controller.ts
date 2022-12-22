import { Controller, Get } from '@nestjs/common';
import { TodosService } from './todos.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('todos')
@Controller('todos')
export class TodosController {
  todosService: TodosService;
  constructor() {
    this.todosService = new TodosService();
  }
  @Get()
  findAll() {
    return this.todosService.findAll();
  }
}
