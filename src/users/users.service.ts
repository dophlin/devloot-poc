import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
    private readonly users = [
        {
            id: 1, username: 'user-01', password: 'password'
        },
        {
            id: 2, username: 'user-02', password: 'password'
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
