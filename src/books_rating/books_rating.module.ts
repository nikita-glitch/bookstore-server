import { Module } from '@nestjs/common';
import { BooksRatingService } from './books_rating.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/books.entity';
import { BooksRating } from './entities/books_rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ User, Book, BooksRating ])],
  providers: [BooksRatingService],
  exports: [BooksRatingService]
})
export class BooksRatingModule {}
