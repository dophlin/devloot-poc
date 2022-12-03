import { Body, Controller, Get, Post, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { UseRole } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/users/model/user.role';
import { BusinessesService } from './businesses.service';
import { SignUpBusinessDTO } from './dto/business.signup';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('businesses')
export class BusinessesController {
    constructor(private businessesService: BusinessesService) { }

    @Post()
    signUp(@Body(new ValidationPipe()) signUpDTO: SignUpBusinessDTO) {
        return this.businessesService.create(signUpDTO);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('profile')
    @UseRole(Role.Business)
    getProfile(@Request() request) {
        return this.businessesService.getProfile(request.user.id);
    }
}
