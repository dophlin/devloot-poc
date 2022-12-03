import { Body, Controller, Get, Post, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.gurad';
import { BusinessesService } from 'src/businesses/businesses.service';
import { CustomersService } from 'src/customers/customers.service';
import { UseRole } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/users/model/user.role';
import { AdminsService } from './admins.service';
import { SignUpAdminDTO } from './dto/admin.signup';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('admins')
export class AdminsController {
    constructor(
        private adminsService: AdminsService, 
        private customersService: CustomersService, 
        private businessesService: BusinessesService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseRole(Role.SuperAdmin)
    signUp(@Body(new ValidationPipe()) signUpDTO: SignUpAdminDTO) {
        return this.adminsService.create(signUpDTO);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseRole(Role.Admin)
    getProfile(@Request() request) {
        return this.adminsService.getProfile(request.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('customers')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseRole(Role.Admin)
    getCustomers(@Request() request) {
        return this.customersService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('businesses')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseRole(Role.Admin)
    getBusinesses(@Request() request) {
        return this.businessesService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseRole(Role.SuperAdmin)
    getAdmins(@Request() request) {
        return this.adminsService.getAll();
    }
}
