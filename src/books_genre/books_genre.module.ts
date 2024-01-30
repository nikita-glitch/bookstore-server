import { Module } from '@nestjs/common';
import { BooksGenreService } from './books_genre.service';
import { BooksGenreController } from './books_genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksGenre } from './entities/books_genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BooksGenre])],
  controllers: [BooksGenreController],
  providers: [BooksGenreService],
})
export class BooksGenreModule {}