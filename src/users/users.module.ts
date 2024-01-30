import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserAvatar } from 'src/user_avatar/entities/user_avatar.entity';
import { UserAvatarService } from 'src/user_avatar/user_avatar.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAvatar]), JwtModule],
  controllers: [UsersController],
  providers: [UsersService, UserAvatarService, ]
})
export class UsersModule {}
