import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), UsersModule],
  providers: [CustomersService],
  controllers: [CustomersController],
  exports:[TypeOrmModule, CustomersService]
})
export class CustomersModule { }
