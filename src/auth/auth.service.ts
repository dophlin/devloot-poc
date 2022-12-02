import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { jwtConfigs } from './configs';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async validateUser(username: string, password: string): Promise<User> {
        const hash = await bcrypt.hash(password, jwtConfigs.salt);
        const hasPasswordMatch = await this.userService.hasPasswordMatch(username, hash);
        if (hasPasswordMatch) {
            const theUser = await this.userService.findByUsername(username);
            if (theUser) return theUser;
        }
        return null;
    }

    async login(user: User) {
        const payload = user;
        return { accessToken: this.jwtService.sign({ ...user }) };
    }
}
