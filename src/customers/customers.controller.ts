import { Body, Controller, Get, Post, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { UseRole } from 'src/auth/decorator/role.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/users/model/user.role';
import { CustomersService } from './customers.service';
import { SignUpCustomerDTO } from './dto/customer.signup';

@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) { }

    @Post()
    signUp(@Body(new ValidationPipe()) signUpDTO: SignUpCustomerDTO) {
        return this.customersService.create(signUpDTO);
    }

    @Get('profile')
    @UseRole(Role.Customer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    getProfile(@Request() request) {
        return this.customersService.getProfile(request.user.id);
    }
}
