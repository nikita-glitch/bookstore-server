import { Module } from '@nestjs/common';
import { BooksRatingService } from './books_rating.service';
import { BooksRatingController } from './books_rating.controller';

@Module({
  controllers: [BooksRatingController],
  providers: [BooksRatingService],
})
export class BooksRatingModule {}
