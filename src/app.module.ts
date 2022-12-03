import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { CustomersModule } from './customers/customers.module';
import { AdminsModule } from './admins/admins.module';
import { BusinessesModule } from './businesses/businesses.module';
import { Customer } from './customers/entity/customer.entity';
import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { Business } from './businesses/entity/business.entity';
import { BusinessesController } from './businesses/businesses.controller';
import { BusinessesService } from './businesses/businesses.service';
import { Admin } from './admins/entity/admin.entity';
import { AdminsController } from './admins/admins.controller';
import { AdminsService } from './admins/admins.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/roles.guard';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [User, Customer, Business, Admin],
    synchronize: true,
    logging: true
  }), UsersModule, CustomersModule, AdminsModule, BusinessesModule],
  controllers: [AppController, CustomersController, BusinessesController, AdminsController],
  providers: [AppService, CustomersService, BusinessesService, AdminsService],
})
export class AppModule { }
