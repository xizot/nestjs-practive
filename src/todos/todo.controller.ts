import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm/index';
import { EntityId } from 'typeorm/repository/EntityId';
import {
  TodoCreateReqDto,
  TodoDto,
  TodosDto,
  TodoUpdateReqDto,
} from './todo.dto';
import { TodoService } from './todo.service';

@ApiTags('todos')
@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async showAll(@Request() request): Promise<TodosDto> {
    const { id } = request.user;
    const todos = await this.todoService.findByUserId(id);
    return plainToClass(
      TodosDto,
      { data: todos[0], totalCount: todos[1] },
      { excludeExtraneousValues: true },
    );
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
  async create(
    @Request() request,
    @Body() userData: TodoCreateReqDto,
  ): Promise<TodoDto> {
    const { id } = request.user;
    const createdUser = await this.todoService.save({
      ...userData,
      userId: id,
    });
    return plainToClass(TodoDto, createdUser, {
      excludeExtraneousValues: true,
    });
  }

  @Put('/:id')
  async update(
    @Request() request,
    @Param('id') id: EntityId,
    @Body() data: TodoUpdateReqDto,
  ): Promise<TodoDto> {
    const todo = await this.todoService.findById(id);
    if (!todo) {
      throw new NotFoundException();
    }
    if (todo.userId != request.user.id) {
      throw new ForbiddenException();
    }

    return this.todoService.update(id, data);
  }

  @Delete('/:id')
  async destroy(
    @Request() request,
    @Param('id') id: EntityId,
  ): Promise<DeleteResult> {
    const todo = await this.todoService.findById(id);
    if (!todo) {
      throw new NotFoundException();
    }
    if (todo.userId != request.user.id) {
      throw new ForbiddenException();
    }
    return this.todoService.delete(id);
  }
}
