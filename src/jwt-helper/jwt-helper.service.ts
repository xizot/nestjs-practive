import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/users/user.service';

@Injectable()
export class JwtHelperService {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.accessTokenSecret = this.configService.get<string>(
      'jwt.accessTokenSecret',
    );
    this.refreshTokenSecret = this.configService.get<string>(
      'jwt.refreshTokenSecret',
    );
    this.accessTokenExpiresIn = this.configService.get<string>(
      'jwt.accessTokenExpiresIn',
    );
    this.refreshTokenExpiresIn = this.configService.get<string>(
      'jwt.refreshTokenExpiresIn',
    );
  }

  async GenerateAccessToken(userId: string, payload: any = {}) {
    return this.jwtService.signAsync(
      {
        __id: userId,
        ...payload,
      },
      {
        secret: this.accessTokenSecret,
        expiresIn: this.accessTokenExpiresIn,
      },
    );
  }
  async GenerateRefreshToken(userId: string, payload: any = {}) {
    const refreshToken = await this.jwtService.signAsync(
      {
        __id: userId,
        ...payload,
      },
      {
        secret: this.refreshTokenSecret,
        expiresIn: this.refreshTokenExpiresIn,
      },
    );

    await this.userService.updateRefreshToken(userId, refreshToken);

    return refreshToken;
  }
}
