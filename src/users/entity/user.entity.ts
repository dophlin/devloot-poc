import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { SignUpDTO } from '../dto/user.signup';
import { Role } from '../model/user.role';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ select: false })
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    role: Role;

    static fromSignUpDTO(signUpDTO: SignUpDTO): User {
        const theUser = new User();
        theUser.firstName = signUpDTO.firstName;
        theUser.lastName = signUpDTO.lastName;
        theUser.password = signUpDTO.password;
        theUser.username = signUpDTO.email;
        theUser.role = signUpDTO.role;
        return theUser;
    }

    static fromAdminObject(superAdmin: { id: number; firstName: string; lastName: string; username: string; password: string; }): User {
        const theUser = new User();
        theUser.firstName = superAdmin.firstName;
        theUser.lastName = superAdmin.lastName;
        theUser.password = superAdmin.password;
        theUser.username = superAdmin.username;
        theUser.role = Role.Admin;
        return theUser;
    }
}
