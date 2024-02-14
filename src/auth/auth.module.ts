import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CartService } from 'src/cart/cart.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { FavoriteBooksService } from 'src/favorite_books/favorite_books.service';
import { FavoriteBook } from 'src/favorite_books/entities/favorite_book.entity';
import { Book } from 'src/books/entities/books.entity';
import { CartBook } from 'src/cart_books/entities/cart_book.entity';
import { CartBooksService } from 'src/cart_books/cart_books.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Cart,
      Favorite,
      FavoriteBook,
      Book,
      CartBook,
    ]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    CartService,
    FavoritesService,
    FavoriteBooksService,
    CartBooksService,
  ],
})
export class AuthModule {}
