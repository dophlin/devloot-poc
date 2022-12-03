import { Module } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entity/business.entity';
import { BusinessesController } from './businesses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Business]), UsersModule],
  providers: [BusinessesService],
  exports:[TypeOrmModule, BusinessesService],
  controllers: [BusinessesController]
})
export class BusinessesModule { }
