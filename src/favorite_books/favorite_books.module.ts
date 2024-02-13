import { Module } from '@nestjs/common';
import { FavoriteBooksService } from './favorite_books.service';
import { FavoriteBooksController } from './favorite_books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { FavoriteBook } from './entities/favorite_book.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Book } from 'src/books/entities/books.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, FavoriteBook, Favorite, Book]), JwtModule],
  controllers: [FavoriteBooksController],
  providers: [FavoriteBooksService],
})
export class FavoriteBooksModule {}
