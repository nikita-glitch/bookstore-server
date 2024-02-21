import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAvatar } from './entities/user_avatar.entity';
import { User } from 'src/users/entities/user.entity';
import { FileServise } from 'src/file_servise/file.service';

@Injectable()
export class UserAvatarService {
  constructor(
    @InjectRepository(UserAvatar)
    private avatarRep: Repository<UserAvatar>,
    @InjectRepository(User)
    private userRep: Repository<User>,
    private fileService: FileServise

  ) {}

  async uploadAvatar(
    userId: string,
    file: Express.Multer.File,
  ): Promise<UserAvatar> {
    const user = await this.userRep.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User does not found', HttpStatus.NOT_FOUND);
    }
    const existedAvatar = await this.avatarRep.findOneBy({ id: user.avatarId });
    if (existedAvatar) {
      this.fileService.removeFile(existedAvatar.avatarName)
    }
    const avatarImage = this.fileService.createFile(file)
    const avatar = this.avatarRep.create({
      avatarName: avatarImage,
      user: user,
    });
    await this.avatarRep.save(avatar);
    await this.avatarRep.remove(existedAvatar);
    return avatar
  }
}
