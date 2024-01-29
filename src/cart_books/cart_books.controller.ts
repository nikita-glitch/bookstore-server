import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartBooksService } from './cart_books.service';
import { CreateCartBookDto } from './dto/create-cart_book.dto';
import { UpdateCartBookDto } from './dto/update-cart_book.dto';

@Controller('cart-books')
export class CartBooksController {
  constructor(private readonly cartBooksService: CartBooksService) {}

  @Post()
  create(@Body() createCartBookDto: CreateCartBookDto) {
    return this.cartBooksService.create(createCartBookDto);
  }

  @Get()
  findAll() {
    return this.cartBooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartBooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartBookDto: UpdateCartBookDto) {
    return this.cartBooksService.update(+id, updateCartBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartBooksService.remove(+id);
  }
}
