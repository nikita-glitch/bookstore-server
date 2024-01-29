import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, HttpStatus, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('')
  async addToCart(
    @Param()
    @Body()
    @Res() res: Response
  ) {
    return res.status(HttpStatus.OK).json()
  }

  @Patch('')
  async addToFavorite(
    @Param()
    @Body()
    @Res() res: Response
  ) {
    return res.status(HttpStatus.OK).json()
  }

  @Get('profile')
  async getUser(
    @Param()
    @Body()
    @Res() res: Response
  ) {
    return res.status(HttpStatus.OK).json()
  }

  @Patch('')
  async changeProfile(
    @Param()
    @Body()
    @Res() res: Response
  ) {
    return res.status(HttpStatus.OK).json()
  }

  @Delete('')
  async removeFromCart(
    @Param()
    @Body()
    @Res() res: Response
  ) {
    return res.status(HttpStatus.OK).json()
  }

  @Delete('')
  async removeFromFavorite(
    @Param()
    @Body()
    @Res() res: Response
  ) {
    return res.status(HttpStatus.OK).json()
  }

  @Patch('')
  async changePassword(
    @Param() 
    userId: string,
    @Body() 
    changePasswordDto: ChangePasswordDto,
    @Res() res: Response
  ) {
    await this.usersService.changePassword(userId, changePasswordDto)
    return res.status(HttpStatus.OK).json()
  }

  @Put('')
  async addAvatar(
    @Param()
    @UploadedFile()
    file: Express.Multer.File,
    @Res() res: Response
  ) {
    return res.status(HttpStatus.OK).json()
  }
}
