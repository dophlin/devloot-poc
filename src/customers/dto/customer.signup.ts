import { User } from "src/users/entity/user.entity";
import { Customer } from "../entity/customer.entity";
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpCustomerDTO {
    @IsString()
    @IsNotEmpty()
    firstName: string;
    
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    static toCustomer(signUpDTO: SignUpCustomerDTO, theUser: User): Customer {
        const customer = new Customer();
        customer.firstName = signUpDTO.firstName;
        customer.lastName = signUpDTO.lastName;
        customer.user = theUser;
        return customer;
    }
}