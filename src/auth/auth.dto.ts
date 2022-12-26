import { UserBaseDto, UserDto } from 'src/users/user.dto';

export class AuthLoginDto extends UserBaseDto {}
export class AuthRegisterDto extends UserDto {}

export class AuthLoginResDto {
  constructor(protected accessToken: string, protected refreshToken: string) {}
}
