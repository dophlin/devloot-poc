import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './model/user.role';
import { User } from './entity/user.entity';
import { SignUpDTO } from './dto/user.signup';
import * as bcrypt from 'bcrypt';
import { jwtConfigs } from '../auth/configs';

@Injectable()
export class UsersService {
    private readonly superAdmin = { id: 0, firstName: 'admin', lastName: '', username: 'admin', password: '$2b$10$I1aftQ6n.4VcbEftb2TC8OPinu58ZMcrX06sGFW4ZPrQnL7PPjfgm' };

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
        if (username === 'admin') return Promise.resolve(User.fromAdminObject(this.superAdmin));
        return this.usersRepository.findOneBy({ username });
    }

    async hasPasswordMatch(username: string, password: string): Promise<Boolean> {
        return (await this.usersRepository.countBy({ username, password }) > 0);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async create(signUpDTO: SignUpDTO): Promise<User> {
        const hash = await bcrypt.hash(signUpDTO.password, jwtConfigs.salt);
        signUpDTO.password = hash;
        const theUser = await this.usersRepository.save(User.fromSignUpDTO(signUpDTO));
        theUser.password = null;
        return theUser;
    }

}
