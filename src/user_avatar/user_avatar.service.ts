import { Injectable } from '@nestjs/common';
import { CreateUserAvatarDto } from './dto/create-user_avatar.dto';
import { UpdateUserAvatarDto } from './dto/update-user_avatar.dto';

@Injectable()
export class UserAvatarService {
  create(createUserAvatarDto: CreateUserAvatarDto) {
    return 'This action adds a new userAvatar';
  }

  findAll() {
    return `This action returns all userAvatar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAvatar`;
  }

  update(id: number, updateUserAvatarDto: UpdateUserAvatarDto) {
    return `This action updates a #${id} userAvatar`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAvatar`;
  }
}
