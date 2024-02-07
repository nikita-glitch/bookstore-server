import { Controller, Get, Post, Param, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { Response } from 'express';
import { AuthGuard } from 'src/Guards/authGuard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async findOne(
    @Param('userId') 
    userId: string,
    @Res() res: Response
    ) {
    const cart = await this.cartService.getCartById(userId);
    return res.status(HttpStatus.OK).json(cart)
  }
}
