import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { SignUpAdminDTO } from './dto/admin.signup';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/users/model/user.role';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entity/admin.entity';

@Injectable()
export class AdminsService {
    constructor(
        @InjectRepository(Admin)
        private adminsRepository: Repository<Admin>,
        private usersService: UsersService) { }


    async create(signUpDTO: SignUpAdminDTO): Promise<Admin> {
        const user = this.extractUserFromAdminSignUpDTO(signUpDTO);
        const admin = SignUpAdminDTO.toAdmin(signUpDTO, user);
        await this.usersService.create(user);
        const theAdmin = await this.adminsRepository.save(admin);
        return theAdmin;
    }

    extractUserFromAdminSignUpDTO(signUpDTO: SignUpAdminDTO): User {
        const theUser = new User();
        theUser.password = signUpDTO.password;
        theUser.username = signUpDTO.email;
        theUser.email = signUpDTO.email;
        theUser.role = Role.Admin;
        return theUser;
    }

    getProfile(id: number) {
        return this.adminsRepository.findOne({ where: { user: { id } }, relations: { user: true } });
    }

    getAll() {
        return this.adminsRepository.find({ relations: { user: true } });
    }
}
