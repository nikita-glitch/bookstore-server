import { Module } from '@nestjs/common';
import { BooksPhotosService } from './books_photos.service';
import { BooksPhotosController } from './books_photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/books.entity';
import { BooksPhoto } from './entities/books_photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BooksPhoto])],
  controllers: [BooksPhotosController],
  providers: [BooksPhotosService],
  exports: [BooksPhotosService]
})
export class BooksPhotosModule {}
