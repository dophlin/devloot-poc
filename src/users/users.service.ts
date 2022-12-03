import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './model/user.role';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { jwtConfigs } from '../auth/configs';

@Injectable()
export class UsersService {

    private readonly superAdmin = {
        id: 0,
        firstName: 'admin',
        email: 'sysadmin@poc.com',
        lastName: '',
        username: 'sysadmin@poc.com',
        password: '$2b$10$I1aftQ6n.4VcbEftb2TC8OGbVIfSOkKnT4PajWlVSKMQ4F78RPD1m'
    };

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findAllByRole(role: Role): Promise<User[]> {
        return this.usersRepository.findBy({ role });
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    findByUsername(username: string): Promise<User> {
        if (username === this.superAdmin.username) return Promise.resolve(User.fromSuperAdminObject(this.superAdmin));
        return this.usersRepository.findOneBy({ username });
    }

    async hasPasswordMatch(username: string, password: string): Promise<Boolean> {
        if (username === this.superAdmin.username) {
            return (await bcrypt.hash(password, jwtConfigs.salt)) === this.superAdmin.password;
        }
        return (await this.usersRepository.countBy({ username, password }) > 0);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async create(user: User) {
        if (user.username === this.superAdmin.username) throw new ConflictException('The email already exists');
        const hash = await bcrypt.hash(user.password, jwtConfigs.salt);
        user.password = hash;
        try {
            const theUser = await this.usersRepository.save(user);
            theUser.password = null;
            return theUser;
        } catch (error: any) {
            console.log(555, error)
            if (error.errno == 19) {
                throw new ConflictException('The email already exists');
            } else {
                throw error;
            }
        }

    }
}
