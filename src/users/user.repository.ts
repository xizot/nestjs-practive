import { UserDto } from './user.dto';

export class UserRepository {
    createUser(user: any): any {
        user.id = 1;
        user.createdAt = new Date();
        user.updatedAt = new Date();
        console.log(user);
        return UserDto.plainToClass(user);
    }
}
