import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { BusinessesService } from 'src/businesses/businesses.service';
import { CustomersService } from 'src/customers/customers.service';
import { AdminsService } from './admins.service';
import { SignUpAdminDTO } from './dto/admin.signup';

@Controller('admins')
export class AdminsController {
    constructor(
        private adminsService: AdminsService, 
        private customersService: CustomersService, 
        private businessesService: BusinessesService) { }

    @Post()
    signUp(@Body() signUpDTO: SignUpAdminDTO) {
        return this.adminsService.create(signUpDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() request) {
        return this.adminsService.getProfile(request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('customers')
    getCustomers(@Request() request) {
        return this.customersService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('businesses')
    getBusinesses(@Request() request) {
        return this.businessesService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAdmins(@Request() request) {
        return this.adminsService.getAll();
    }
}
