import { User } from "src/users/entity/user.entity";
import { Customer } from "../entity/customer.entity";

export class SignUpCustomerDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    static toCustomer(signUpDTO: SignUpCustomerDTO, theUser: User): Customer {
        const customer = new Customer();
        customer.firstName = signUpDTO.firstName;
        customer.lastName = signUpDTO.lastName;
        customer.user = theUser;
        return customer;
    }
}