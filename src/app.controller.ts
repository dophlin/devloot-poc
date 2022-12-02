import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.gurad';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
