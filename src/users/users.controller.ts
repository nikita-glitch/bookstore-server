import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Put,
  Res,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Delete,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AuthGuard } from 'src/Guards/authGuard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Readable } from 'stream';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getUser(
    @Param('userId')
    userId: string,
    @Res() res: Response,
  ) {
    const user = await this.usersService.getUser(userId);
    return res.status(HttpStatus.OK).json(user);
  }

  @Patch('profile/profile-change')
  async changeProfile(
    @Param('userId')
    userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const name = await this.usersService.changeProfileData(
      userId,
      updateUserDto,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Profile updated succsessfully', name });
  }

  @Patch('profile/password-change')
  async changePassword(
    @Param('userId')
    userId: string,
    @Body()
    changePasswordDto: ChangePasswordDto,
    @Res() res: Response,
  ) {
    await this.usersService.changePassword(userId, changePasswordDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Password changed succsessfully' });
  }

  @Put('profile')
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Param('userId')
    userId: string,
    @UploadedFile()
    file: Express.Multer.File,
    @Res() res: Response,
  ) {    
    if (!file) {
      return
    }
    const avatar = await this.usersService.addUserAvatar(
      userId,
      file
    );
    return res
      .status(HttpStatus.OK)
      .json({ avatar, message: 'Avatar uploaded succsessfully' });
  }

  @Delete('cart')
  async removeFromCart(
    @Param('userId')
    userId: string,
    @Body()
    Body: { bookId: string },
    @Res() res: Response,
  ) {
    await this.usersService.removeBookFromCart(Body.bookId, userId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Book was succsessfully removed from cart' });
  }

  @Delete('favorite')
  async removeFromFavorite(
    @Param('userId')
    userId: string,
    @Body()
    Body: { bookId: string },
    @Res() res: Response,
  ) {    
    await this.usersService.removeBookFromFavorites(Body.bookId, userId);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Book was succsessfully removed from favorite' });
  }

  @Post('cart')
  async addToCart(
    @Param('userId')
    userId: string,
    @Body()
    Body: { bookId: string },
    @Res() res: Response,
  ) {
    const cartBook = await this.usersService.addBookToCart(Body.bookId, userId);
    return res
      .status(HttpStatus.CREATED)
      .json({ cartBook: cartBook, message: 'Book was succsessfully added to cart' });
  }

  @Post('favorite')
  async addToFavorite(
    @Param('userId')
    userId: string,
    @Body()
    Body: { bookId: string },
    @Res() res: Response,
  ) {
    const favoriteBook = await this.usersService.addBookToFavorites(Body.bookId, userId);
    return res
      .status(HttpStatus.CREATED)
      .json({ favoriteBook: favoriteBook, message: 'Book was succsessfully added to favorite' });
  }

  @UseGuards(AuthGuard)
  @Put('rating')
  async setRating(
    @Param('userId')
    userId: string,
    @Body()
    Body: { 
    bookId: string,
    ratingValue: number,
    },
    @Res() res: Response,
  ) {    
    const {userRatingOfBook, ratingOfBook} = await this.usersService.setRating(userId, Body.bookId, Body.ratingValue);
    return res
      .status(HttpStatus.OK)
      .json({ ratingOfBook: ratingOfBook, userRatingOfBook: userRatingOfBook, message: 'Rating setted succsessfully' });
  }

  @UseGuards(AuthGuard)
  @Post('comment')
  async createcomment(
    @Param('userId')
    userId: string,
    @Body()
    Body: { 
    commentText: string,
    bookId: string,
    },
    @Res() res: Response,
  ) {
    const comment = await this.usersService.createComment(Body.commentText, userId, Body.bookId);
    return res
      .status(HttpStatus.CREATED)
      .json({ comment: comment, message: 'Comment added succsessfully' });
  }
}
