import { Module } from '@nestjs/common';
import { CartBooksService } from './cart_books.service';
import { CartBooksController } from './cart_books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartBook } from './entities/cart_book.entity';
import { Book } from 'src/books/entities/books.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartBook, Book, User])],
  controllers: [CartBooksController],
  providers: [CartBooksService],
  exports: [CartBooksService]
})
export class CartBooksModule {}
