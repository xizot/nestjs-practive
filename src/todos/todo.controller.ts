import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm/index';
import { EntityId } from 'typeorm/repository/EntityId';
import { TodoDto } from './todo.dto';
import { TodoService } from './todo.service';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  // constructor(private moduleRef: ModuleRef) {}
  constructor(private readonly todoService: TodoService) {}

  @Get()
  index(): Promise<TodoDto[]> {
    return this.todoService.index();
  }

  @Get('/:id')
  async show(@Param('id') id: EntityId): Promise<TodoDto> {
    const user = await this.todoService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return plainToClass(TodoDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  async create(@Body() userData: TodoDto): Promise<TodoDto> {
    const createdUser = await this.todoService.save(userData);
    return plainToClass(TodoDto, createdUser, {
      excludeExtraneousValues: true,
    });
  }

  @Put('/:id')
  update(
    @Param('id') id: EntityId,
    @Body() userData: TodoDto,
  ): Promise<TodoDto> {
    return this.todoService.update(id, userData);
  }

  @Delete('/:id')
  destroy(@Param('id') id: EntityId): Promise<DeleteResult> {
    return this.todoService.delete(id);
  }
}
