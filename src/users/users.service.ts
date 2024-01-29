import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import { ChangePasswordDto } from './dto/change-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async addBookToCart() {

  }

  async addBookToFavorites() {

  }

  async removeBookFromCart() {

  }

  async removeBookFromFavorites() {
    
  }

  async changeProfileData() {

  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword, passwordToCompare } = changePasswordDto;
    const isEqual = newPassword.localeCompare(passwordToCompare);
    if (!isEqual) {
      throw new HttpException('Password does not match', HttpStatus.BAD_REQUEST);
    }
    const person = await this.userRepository
    .createQueryBuilder("user")
    //.select("user.id", "id")
    .where("user.id = :id", { id: userId })
    .addSelect("user.password")
    .getOne()

    if (!person) {
      throw new HttpException('Wrong email or password', HttpStatus.NOT_FOUND);
    }

    const comparedPass = await bcrypt.compare(oldPassword, person.password);
    if (!comparedPass) {
      throw new HttpException('Wrong email or password', HttpStatus.UNAUTHORIZED);
    }
    const hashedPass = await bcrypt.hash(newPassword, 3)
    await this.userRepository.update(userId, { password: hashedPass })
  }

  async addUserAvatar() {

  }

  async orderBooks() {

  }

  async getUser() {

  }
}
