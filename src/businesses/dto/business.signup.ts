import { User } from "src/users/entity/user.entity";
import { Business } from "../entity/business.entity";

export class SignUpBusinessDTO {
    name: string;
    activities: string[];
    email: string;
    password: string;

    static toBusiness(signUpDTO: SignUpBusinessDTO, theUser: User): Business {
        const business = new Business();
        business.name = signUpDTO.name;
        business.activities = signUpDTO.activities;
        business.user = theUser;
        return business;
    }
}