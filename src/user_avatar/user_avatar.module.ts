import { Module } from '@nestjs/common';
import { UserAvatarService } from './user_avatar.service';
import { UserAvatarController } from './user_avatar.controller';

@Module({
  controllers: [UserAvatarController],
  providers: [UserAvatarService],
})
export class UserAvatarModule {}
