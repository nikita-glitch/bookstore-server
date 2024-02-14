import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Favorite } from './entities/favorite.entity';
import { JwtModule } from '@nestjs/jwt';
import { FavoriteBooksService } from 'src/favorite_books/favorite_books.service';
import { FavoriteBook } from 'src/favorite_books/entities/favorite_book.entity';
import { Book } from 'src/books/entities/books.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Favorite, FavoriteBook, Book]), JwtModule, ],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoriteBooksService],
})
export class FavoritesModule {}
