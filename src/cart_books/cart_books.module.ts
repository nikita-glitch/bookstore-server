import { Module } from '@nestjs/common';
import { CartBooksService } from './cart_books.service';
import { CartBooksController } from './cart_books.controller';

@Module({
  controllers: [CartBooksController],
  providers: [CartBooksService],
})
export class CartBooksModule {}
