import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { FavoritesModule } from './favorites/favorites.module';
import { BooksModule } from './books/books.module';
import { CommentsModule } from './comments/comments.module';
import { BooksAuthorModule } from './books_author/books_author.module';
import { BooksGenreModule } from './books_genre/books_genre.module';
import { BooksRatingModule } from './books_rating/books_rating.module';
import { CartBooksModule } from './cart_books/cart_books.module';
import { FavoriteBooksModule } from './favorite_books/favorite_books.module';
import { UserAvatarModule } from './user_avatar/user_avatar.module';
import { BooksPhotosModule } from './books_photos/books_photos.module';
import { User } from './users/entities/user.entity';
import { UserAvatar } from './user_avatar/entities/user_avatar.entity';
import { Cart } from './cart/entities/cart.entity';
import { Favorite } from './favorites/entities/favorite.entity';
import { Book } from './books/entities/books.entity';
import { BooksAuthor } from './books_author/entities/books_author.entity';
import { BooksGenre } from './books_genre/entities/books_genre.entity';
import { BooksRating } from './books_rating/entities/books_rating.entity';
import { BooksPhoto } from './books_photos/entities/books_photo.entity';
import { CartBook } from './cart_books/entities/cart_book.entity';
import { FavoriteBook } from './favorite_books/entities/favorite_book.entity';
import { Comment } from './comments/entities/comment.entity';
import { APP_FILTER } from '@nestjs/core';
import { customExceptionFilter } from './exceptionFilter/exception.filter';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GenreModule } from './genre/genre.module';
import { Genre } from './genre/entity/genre.entity';

const filePath = path.join(path.dirname(__dirname), '/src/.env');

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: filePath }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "../static"),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        UserAvatar,
        Cart,
        Favorite,
        Book,
        Comment,
        BooksAuthor,
        BooksGenre,
        BooksRating,
        BooksPhoto,
        CartBook,
        FavoriteBook,
        Genre
      ],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CartModule,
    FavoritesModule,
    BooksModule,
    CommentsModule,
    BooksAuthorModule,
    BooksGenreModule,
    BooksRatingModule,
    CartBooksModule,
    FavoriteBooksModule,
    UserAvatarModule,
    BooksPhotosModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: customExceptionFilter,
    },
  ],
})
export class AppModule {}
