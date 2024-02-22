import { Module } from '@nestjs/common';
import { BooksGenreService } from './books_genre.service';
import { BooksGenreController } from './books_genre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksGenre } from './entities/books_genre.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Book } from 'src/books/entities/books.entity';
import { Genre } from 'src/genre/entity/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BooksGenre, User, Book, Genre]), JwtModule],
  controllers: [BooksGenreController],
  providers: [BooksGenreService],
})
export class BooksGenreModule {}
