import { Module } from '@nestjs/common';
import { UserAvatarService } from './user_avatar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAvatar } from './entities/user_avatar.entity';
import { User } from 'src/users/entities/user.entity';
import { FileServise } from 'src/file_servise/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserAvatar, User])],
  providers: [UserAvatarService, FileServise],
  exports: [UserAvatarService]
})
export class UserAvatarModule {}
