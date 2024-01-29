import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { signInSchema, signUpSchema } from 'src/validationSchemas/auth.schema';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('sign-up')
  @UsePipes(new ValidationPipe(signUpSchema))
  async auth(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    await this.authService.signUp(createUserDto);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'User has been created succsessfully' });
  }

  @Post('sign-in')
  @UsePipes(new ValidationPipe(signInSchema))
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res() res: Response,
  ): Promise<any> {
    const tokenData = await this.authService.signIn(loginUserDto)
    return res
      .status(HttpStatus.OK)
      .json(tokenData);
  }
}
