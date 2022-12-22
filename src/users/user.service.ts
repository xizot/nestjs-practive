import { UserDto } from './user.dto';
import { UserRepository } from './user.repository';

export class UserService {
    /**
     *
     */
    constructor(userRepository: UserRepository) {}
    createUser(user: any): any {
        user.id = 1;
        user.createdAt = new Date();
        user.updatedAt = new Date();
        console.log(user);
        return UserDto.plainToClass(user);
    }
}
