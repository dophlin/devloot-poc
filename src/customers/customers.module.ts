import { Module, ValidationPipe } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), UsersModule],
  providers: [CustomersService, { provide: APP_PIPE, useClass: ValidationPipe }],
  controllers: [CustomersController],
  exports: [TypeOrmModule, CustomersService]
})
export class CustomersModule { }
