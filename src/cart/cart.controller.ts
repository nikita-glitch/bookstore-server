import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  HttpStatus,
  UseGuards,
  Delete,
  Patch,
  Body,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Response } from 'express';
import { AuthGuard } from 'src/Guards/authGuard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async getAllCartBooks(
    @Param('userId')
    userId: string,
    @Res() res: Response,
  ) {
    const cartBooks = await this.cartService.getAllCartBooks(userId)
    return res.status(HttpStatus.OK).json(cartBooks)
  }
  @UseGuards(AuthGuard)
  @Delete('')
  async removeFromCart(
    @Param('userId')
    userId: string,
    @Body()
    bookId: string,
    @Res() res: Response,
  ) {
    await this.cartService.removeFromCart(bookId, userId)
    return res.status(HttpStatus.OK).json({ message: 'Book was deleted succsessfully' })
  }
  @UseGuards(AuthGuard)
  @Patch('')
  async changeAmount(
    @Param('userId')
    userId: string,
    @Body()
    bookId: string,
    isIncrement: boolean,
    @Res() res: Response,
  ) {
    await this.cartService.changeAmount(bookId, userId, isIncrement)
    return res.status(HttpStatus.OK).json({ message: 'Amount was changed succsessfully' })
  }
  @UseGuards(AuthGuard)
  @Post('')
  async addToCart(
    @Param('userId')
    userId: string,
    @Body()
    bookId: string,
    @Res() res: Response,
  ) {
    await this.cartService.addToCart(bookId, userId)
    return res.status(HttpStatus.CREATED).json({ message: 'Book was added to cart succsessfully' })
  }
}
