import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/books.entity';
import { BooksAuthor } from 'src/books_author/entities/books_author.entity';
import { BooksGenre } from 'src/books_genre/entities/books_genre.entity';
import { BooksPhoto } from 'src/books_photos/entities/books_photo.entity';
import { BooksRating } from 'src/books_rating/entities/books_rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BooksAuthor, BooksGenre, BooksPhoto, BooksRating])],
  controllers: [BooksController, ],
  providers: [BooksService],
})
export class BooksModule {}
