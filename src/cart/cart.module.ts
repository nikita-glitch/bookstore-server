import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Cart } from './entities/cart.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CartBooksService } from 'src/cart_books/cart_books.service';
import { CartBook } from 'src/cart_books/entities/cart_book.entity';
import { Book } from 'src/books/entities/books.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Cart, CartBook, Book]), JwtModule],
  controllers: [CartController],
  providers: [CartService, CartBooksService],
})
export class CartModule {}
