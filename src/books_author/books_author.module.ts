import { Module } from '@nestjs/common';
import { BooksAuthorService } from './books_author.service';
import { BooksAuthorController } from './books_author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksAuthor } from './entities/books_author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BooksAuthor])],
  controllers: [BooksAuthorController],
  providers: [BooksAuthorService],
})
export class BooksAuthorModule {}
