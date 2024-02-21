import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserAvatar } from 'src/user_avatar/entities/user_avatar.entity';
import { UserAvatarService } from 'src/user_avatar/user_avatar.service';
import { JwtModule } from '@nestjs/jwt';
import { Book } from 'src/books/entities/books.entity';
import { BooksRating } from 'src/books_rating/entities/books_rating.entity';
import { BooksAuthor } from 'src/books_author/entities/books_author.entity';
import { BooksRatingService } from 'src/books_rating/books_rating.service';
import { CommentsService } from 'src/comments/comments.service';
import { Comment } from 'src/comments/entities/comment.entity';
import { CartService } from 'src/cart/cart.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { CartBook } from 'src/cart_books/entities/cart_book.entity';
import { FavoriteBook } from 'src/favorite_books/entities/favorite_book.entity';
import { CartBooksService } from 'src/cart_books/cart_books.service';
import { FavoriteBooksService } from 'src/favorite_books/favorite_books.service';
import { FileServise } from 'src/file_servise/file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserAvatar,
      Book,
      BooksRating,
      BooksAuthor,
      Comment,
      Cart,
      Favorite,
      CartBook, 
      FavoriteBook
    ]),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserAvatarService,
    BooksRatingService,
    CommentsService,
    CartService,
    FavoritesService,
    CartBooksService,
    FavoriteBooksService,
    FileServise
  ],
})
export class UsersModule {}
