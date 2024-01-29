import { Module } from '@nestjs/common';
import { FavoriteBooksService } from './favorite_books.service';
import { FavoriteBooksController } from './favorite_books.controller';

@Module({
  controllers: [FavoriteBooksController],
  providers: [FavoriteBooksService],
})
export class FavoriteBooksModule {}
