import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAvatar } from './entities/user_avatar.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserAvatarService {
  constructor(
    @InjectRepository(UserAvatar)
    private avatarRep: Repository<UserAvatar>,
    @InjectRepository(User)
    private userRep: Repository<User>,
  ) {}

  async getAvatar(userId: string): Promise<UserAvatar> {
    const avatar = this.avatarRep.findOneBy({ userId: userId });
    return avatar;
  }

  async uploadAvatar(
    userId: string,
    avatarName: string,
    dataBuffer: Buffer,
  ): Promise<void> {
    const user = await this.userRep.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User does not found', HttpStatus.NOT_FOUND);
    }
    const existedAvatar = await this.avatarRep.findOneBy({ userId: userId });
    if (existedAvatar) {
      await this.avatarRep.remove(existedAvatar);
    }
    const avatar = this.avatarRep.create({
      avatarName,
      data: dataBuffer,
      user: user,
    });
    await this.avatarRep.save(avatar);
  }
}
