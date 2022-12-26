import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { JwtHelperService } from 'src/jwt-helper/jwt-helper.service';
import { UserEntity } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { AuthLoginDto, AuthLoginResDto, AuthRegisterDto } from './auth.dto';
import {
  AuthPasswordIsNotMatch,
  AuthUserAlreadyExists,
} from './auth.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtHelperService: JwtHelperService,
  ) {}

  async login(data: AuthLoginDto): Promise<AuthLoginResDto> {
    const user = await this.userService.findByEmail(data.email);
    if (!user) {
      throw new NotFoundException();
    }

    const isValidPassword = await this.verifyPassword(
      data.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new AuthPasswordIsNotMatch();
    }

    const accessToken = await this.jwtHelperService.GenerateAccessToken(
      user.id,
    );
    const refreshToken = await this.jwtHelperService.GenerateRefreshToken(
      user.id,
    );

    return new AuthLoginResDto(accessToken, refreshToken);
  }

  async register(data: AuthRegisterDto): Promise<AuthLoginResDto> {
    const user = await this.userService.findByEmail(data.email);
    if (user) {
      throw new AuthUserAlreadyExists(data.email);
    }
    const hashPassword = await this.hashPassword(data.password);
    data.password = hashPassword;

    const userSaved = await this.userService.save(data);

    const accessToken = await this.jwtHelperService.GenerateAccessToken(
      userSaved.id,
    );
    const refreshToken = await this.jwtHelperService.GenerateRefreshToken(
      userSaved.id,
    );
    return new AuthLoginResDto(accessToken, refreshToken);
  }

  async verifyPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(8);
    return await hash(password, salt);
  }
}
