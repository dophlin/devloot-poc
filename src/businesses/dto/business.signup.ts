import { User } from "src/users/entity/user.entity";
import { Business } from "../entity/business.entity";
import { IsString, IsEmail, IsArray, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

export class SignUpBusinessDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsArray()
    @ArrayNotEmpty()
    activities: string[];

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    static toBusiness(signUpDTO: SignUpBusinessDTO, theUser: User): Business {
        const business = new Business();
        business.name = signUpDTO.name;
        business.activities = signUpDTO.activities;
        business.user = theUser;
        return business;
    }
}