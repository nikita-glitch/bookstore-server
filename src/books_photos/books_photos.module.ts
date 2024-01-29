import { Module } from '@nestjs/common';
import { BooksPhotosService } from './books_photos.service';
import { BooksPhotosController } from './books_photos.controller';

@Module({
  controllers: [BooksPhotosController],
  providers: [BooksPhotosService],
})
export class BooksPhotosModule {}
