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
  StreamableFile,
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

  @Get('profile/avatar')
  async getAvatar(
    @Param('userId')
    userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const avatar = await this.usersService.getUserAvatar(userId);
    const stream = Readable.from(avatar.data);
    res.status(HttpStatus.OK).set({
      'Content-Disposition': `inline; filename="${avatar.avatarName}"`,
      'Content-Type': 'image',
    });
    return new StreamableFile(stream);
  }

  @Patch('profile/profile-change')
  async changeProfile(
    @Param('userId')
    userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const name = await this.usersService.changeProfileData(userId, updateUserDto);
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
    await this.usersService.addUserAvatar(
      userId,
      file.originalname,
      file.buffer,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Avatar uploaded succsessfully' });
  }
}
