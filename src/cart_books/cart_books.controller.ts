import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartBooksService } from './cart_books.service';


@Controller('cart-books')
export class CartBooksController {
  constructor(private readonly cartBooksService: CartBooksService) {}

  
}
