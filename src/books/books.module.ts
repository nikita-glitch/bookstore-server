import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/books.entity';
import { BooksAuthor } from 'src/books_author/entities/books_author.entity';
import { BooksGenre } from 'src/books_genre/entities/books_genre.entity';
import { BooksPhoto } from 'src/books_photos/entities/books_photo.entity';
import { BooksRating } from 'src/books_rating/entities/books_rating.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { BooksRatingService } from 'src/books_rating/books_rating.service';
import { CommentsService } from 'src/comments/comments.service';
import { Comment } from 'src/comments/entities/comment.entity';
import { BooksPhotosService } from 'src/books_photos/books_photos.service';
import { FileServise } from 'src/file_servise/file.service';
import { BooksGenreService } from 'src/books_genre/books_genre.service';
import { Genre } from 'src/genre/entity/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BooksAuthor, BooksGenre, BooksPhoto, BooksRating, User, Comment, Genre]), JwtModule],
  controllers: [BooksController, ],
  providers: [BooksService, BooksRatingService, CommentsService, BooksPhotosService, FileServise, BooksGenreService],
})
export class BooksModule {}
