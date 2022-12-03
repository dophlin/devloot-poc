import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/users/entity/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) { super(); }

    async validate(username: string, passport: string): Promise<User> {
        const theUser = await this.authService.validateUser(username, passport);
        if (!theUser) throw new UnauthorizedException();
        console.log(666, theUser)
        return theUser;
    }
}