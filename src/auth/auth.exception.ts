import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthUserAlreadyExists extends HttpException {
  constructor(email: string) {
    super(`User with email ${email} already exists.`, HttpStatus.FORBIDDEN);
  }
}

export class AuthPasswordIsNotMatch extends HttpException {
  constructor() {
    super(`Password is not match.`, HttpStatus.FORBIDDEN);
  }
}
