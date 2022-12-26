import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthLoginDto, AuthRegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: AuthLoginDto) {
    return this.authService.login(data);
  }

  @Post('register')
  register(@Body() data: AuthRegisterDto) {
    return this.authService.register(data);
  }
}
