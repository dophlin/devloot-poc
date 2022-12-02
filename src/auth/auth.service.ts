import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const theUser = await this.userService.findOne(username);
        if (theUser && theUser.password === password) {
            const { password, ...safeUser } = theUser;
            return safeUser;
        }
        return null;
    }

    async login(user: User) {
        const payload = { id: user.id, username: user.username };
        return { accessToken: this.jwtService.sign(payload) };
    }
}
