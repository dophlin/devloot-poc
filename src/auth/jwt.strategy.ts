import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConfigs } from './configs';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfigs.secret,
        });
    }

    async validate(payload: any) {
        const { iat, exp, ...safe } = payload;
        return safe;
    }
}