import { User } from "src/users/entity/user.entity";
import { Admin } from "../entity/admin.entity";
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpAdminDTO {
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

    static toAdmin(signUpDTO: SignUpAdminDTO, theUser: User): Admin {
        const admin = new Admin();
        admin.firstName = signUpDTO.firstName;
        admin.lastName = signUpDTO.lastName;
        admin.user = theUser;
        return admin;
    }
}