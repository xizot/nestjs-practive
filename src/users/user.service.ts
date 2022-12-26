import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/mysql/base.service';
import { Repository, UpdateResult } from 'typeorm';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';

interface IUserService {
  findByEmail(email: string): Promise<UserDto>;
  updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UpdateResult>;
}

@Injectable()
export class UserService
  extends BaseService<UserEntity, Repository<UserEntity>>
  implements IUserService
{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
  updateRefreshToken(userId: string, token: string): Promise<UpdateResult> {
    return this.userRepository.update(userId, {
      refreshToken: token,
    });
  }
  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
