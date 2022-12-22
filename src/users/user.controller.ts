import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  userService: UserService;

  constructor() {
    const userRepository = new UserRepository();
    this.userService = new UserService(userRepository);
  }

  @Post()
  createUser(@Body() user: UserDto): UserDto {
    return this.userService.createUser(user);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return 'test';
  }
}
