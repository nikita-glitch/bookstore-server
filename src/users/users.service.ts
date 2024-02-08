import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAvatarService } from 'src/user_avatar/user_avatar.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userAvatarService: UserAvatarService,
  ) {}

  async changeProfileData(userId: string, updateUserDto: UpdateUserDto): Promise<string> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User does not found', HttpStatus.NOT_FOUND);
    }    
    await this.userRepository.update(userId, updateUserDto);
    const userAfterUpdate = await this.userRepository.findOneBy({ id: userId });
    return userAfterUpdate.name
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword, passwordToCompare } = changePasswordDto;
    const isEqual = newPassword.localeCompare(passwordToCompare);
    if (isEqual !== 0) {
      throw new HttpException(
        'Password does not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    const person = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .addSelect('user.password')
      .getOne();

    if (!person) {
      throw new HttpException('Wrong email or password', HttpStatus.NOT_FOUND);
    }

    const comparedPass = await bcrypt.compare(oldPassword, person.password);
    if (!comparedPass) {
      throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED);
    }
    const hashedPass = await bcrypt.hash(newPassword, 3);
    await this.userRepository.update(userId, { password: hashedPass });
  }

  async addUserAvatar(userId: string, fileName: string, dataBuffer: Buffer) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User does not found', HttpStatus.NOT_FOUND);
    }
    await this.userAvatarService.uploadAvatar(userId, fileName, dataBuffer);
  }

  async orderBooks() {}

  async getUser(userId: string) {
    return this.userRepository.findOneBy({ id: userId });
  }
  
  async getUserAvatar(userId: string) {
    return this.userAvatarService.getAvatar(userId);
  }
}

