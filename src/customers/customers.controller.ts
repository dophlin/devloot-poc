import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { CustomersService } from './customers.service';
import { SignUpCustomerDTO } from './dto/customer.signup';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) { }

    @Post()
    signUp(@Body() signUpDTO: SignUpCustomerDTO) {
        return this.customersService.create(signUpDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() request) {
        return this.customersService.getProfile(request.user.id);
    }
}
