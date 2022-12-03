import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';
import { AdminsController } from './admins.controller';
import { CustomersModule } from 'src/customers/customers.module';
import { BusinessesModule } from 'src/businesses/businesses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), UsersModule, CustomersModule, BusinessesModule],
  providers: [AdminsService],
  exports:[TypeOrmModule],
  controllers: [AdminsController]
})
export class AdminsModule { }
