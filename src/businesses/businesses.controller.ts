import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { BusinessesService } from './businesses.service';
import { SignUpBusinessDTO } from './dto/business.signup';

@Controller('businesses')
export class BusinessesController {
    constructor(private businessesService: BusinessesService) { }

    @Post()
    signUp(@Body() signUpDTO: SignUpBusinessDTO) {
        return this.businessesService.create(signUpDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() request) {
        return this.businessesService.getProfile(request.user.id);
    }
}
