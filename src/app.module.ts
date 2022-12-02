import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [User],
    synchronize: true,
    logging: true
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
