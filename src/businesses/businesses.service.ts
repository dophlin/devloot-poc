import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { SignUpBusinessDTO } from './dto/business.signup';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/users/model/user.role';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './entity/business.entity';

@Injectable()
export class BusinessesService {
    constructor(
        @InjectRepository(Business)
        private businessesRepository: Repository<Business>,
        private usersService: UsersService) { }


    async create(signUpDTO: SignUpBusinessDTO): Promise<Business> {
        const user = this.extractUserFromBusinessSignUpDTO(signUpDTO);
        const business = SignUpBusinessDTO.toBusiness(signUpDTO, user);
        await this.usersService.create(user);
        const theBusiness = await this.businessesRepository.save(business);
        return theBusiness;
    }

    extractUserFromBusinessSignUpDTO(signUpDTO: SignUpBusinessDTO): User {
        const theUser = new User();
        theUser.password = signUpDTO.password;
        theUser.username = signUpDTO.email;
        theUser.email = signUpDTO.email;
        theUser.role = Role.Business;
        return theUser;
    }

    getProfile(id: number) {
        return this.businessesRepository.findOne({ where: { user: { id } }, relations: { user: true } });
    }

    getAll() {
        return this.businessesRepository.find({ relations: { user: true } });
    }
}
