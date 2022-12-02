import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConfigs } from './configs';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: jwtConfigs.secret, signOptions: { expiresIn: '1d' }
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
