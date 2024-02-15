import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAvatarService } from 'src/user_avatar/user_avatar.service';
import { BooksRatingService } from 'src/books_rating/books_rating.service';
import { CommentsService } from 'src/comments/comments.service';
import { CartService } from 'src/cart/cart.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userAvatarService: UserAvatarService,
    private ratingService: BooksRatingService,
    private commentService: CommentsService,
    private cartService: CartService,
    private favoriteService: FavoritesService,
  ) {}

  async changeProfileData(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<string> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User does not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.update(userId, updateUserDto);
    const userAfterUpdate = await this.userRepository.findOneBy({ id: userId });
    return userAfterUpdate.name;
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
      throw new HttpException(
        'Wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );
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
    return this.userRepository.findOne({
      where: { id: userId },
      relations: {
        cart: {
          cartBooks: true
        },
        favorite: {
          favoriteBooks: true
        }
      }
    });
  }

  async getUserAvatar(userId: string) {
    return this.userAvatarService.getAvatar(userId);
  }

  async addBookToCart(bookId: string, userId: string) {
    await this.cartService.addToCart(bookId, userId);
  }

  async addBookToFavorites(bookId: string, userId: string) {
    await this.favoriteService.addBookToFavorite(bookId, userId);
  }

  async removeBookFromCart(bookId: string, userId: string) {
    await this.cartService.removeFromCart(bookId, userId);
  }

  async removeBookFromFavorites(bookId: string, userId: string) {
    await this.favoriteService.removeBookFromFavorite(bookId, userId);
  }

  async setRating(userId: string, bookId: string, ratingValue: number) {
    return this.ratingService.setRating(userId, bookId, ratingValue);
  }

  async createComment(commentText: string, userId: string, bookId: string) {
    return this.commentService.create(commentText, userId, bookId);
  }
}
