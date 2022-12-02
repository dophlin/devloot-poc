import { Role } from "../model/user.role";

export class SignUpDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}