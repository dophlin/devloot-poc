import { User } from "src/users/entity/user.entity";
import { Admin } from "../entity/admin.entity";

export class SignUpAdminDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    static toAdmin(signUpDTO: SignUpAdminDTO, theUser: User): Admin {
        const admin = new Admin();
        admin.firstName = signUpDTO.firstName;
        admin.lastName = signUpDTO.lastName;
        admin.user = theUser;
        return admin;
    }
}