import { Module, ValidationPipe } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entity/business.entity';
import { BusinessesController } from './businesses.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Business]), UsersModule],
  providers: [BusinessesService, {provide: APP_PIPE, useClass: ValidationPipe}],
  exports:[TypeOrmModule, BusinessesService],
  controllers: [BusinessesController]
})
export class BusinessesModule { }
