import { Controller, Get, UseGuards, Request, Param, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { SignUpDTO } from './dto/user.signup';
import { Role } from './model/user.role';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':role')
    getAllByRole(@Param('role') role: Role) {
        console.log(444, role);
        return this.usersService.findAllByRole(role);
    }

    @Post()
    signUp(@Body() signUpDTO: SignUpDTO) {
        console.log(555, signUpDTO);
        return this.usersService.create(signUpDTO);
    }
}
