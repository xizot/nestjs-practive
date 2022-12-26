import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { DeleteResult } from 'typeorm/index';
import { EntityId } from 'typeorm/repository/EntityId';
import { UserDto, UsersDto } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  // constructor(private moduleRef: ModuleRef) {}
  constructor(private readonly userService: UserService) {}

  @Get()
  async index(): Promise<UsersDto> {
    const users = await this.userService.index();

    console.log(users);

    return plainToClass(
      UsersDto,
      { users: users },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  @Get('/:id')
  async show(@Param('id') id: EntityId): Promise<UserDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return plainToClass(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  async create(@Body() userData: UserDto): Promise<UserDto> {
    const createdUser = await this.userService.save(userData);
    return plainToClass(UserDto, createdUser, {
      excludeExtraneousValues: true,
    });
  }

  @Put('/:id')
  update(
    @Param('id') id: EntityId,
    @Body() userData: UserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, userData);
  }

  @Delete('/:id')
  destroy(@Param('id') id: EntityId): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}
