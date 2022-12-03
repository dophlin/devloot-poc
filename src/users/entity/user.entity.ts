import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Role } from '../model/user.role';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    role: Role;

    static fromAdminObject(superAdmin: { id: number; firstName: string; lastName: string; username: string; password: string; email: string; }): User {
        const theUser = new User();
        theUser.password = superAdmin.password;
        theUser.username = superAdmin.username;
        theUser.email = superAdmin.email;
        theUser.role = Role.Admin;
        return theUser;
    }
    
}
