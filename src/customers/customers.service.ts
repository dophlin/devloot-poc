import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { SignUpCustomerDTO } from './dto/customer.signup';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/users/model/user.role';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entity/customer.entity';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customersRepository: Repository<Customer>,
        private usersService: UsersService) { }


    async create(signUpDTO: SignUpCustomerDTO): Promise<Customer> {
        const user = this.extractUserFromCustomerSignUpDTO(signUpDTO);
        const customer = SignUpCustomerDTO.toCustomer(signUpDTO, user);
        await this.usersService.create(user);
        const theCustomer = await this.customersRepository.save(customer);
        return theCustomer;
    }

    extractUserFromCustomerSignUpDTO(signUpDTO: SignUpCustomerDTO): User {
        const theUser = new User();
        theUser.password = signUpDTO.password;
        theUser.username = signUpDTO.email;
        theUser.email = signUpDTO.email;
        theUser.role = Role.Customer;
        return theUser;
    }

    getProfile(id: number) {
        return this.customersRepository.findOne({ where: { user: { id } }, relations: { user: true } });
    }

    getAll() {
        return this.customersRepository.find({ relations: { user: true } });
    }
}
