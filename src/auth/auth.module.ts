import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: process.env.SECRET_KEY,
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [AuthController,],
  providers: [AuthService],
})
export class AuthModule {}
