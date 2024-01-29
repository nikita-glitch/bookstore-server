import { Injectable } from '@nestjs/common';
import { CreateBooksPhotoDto } from './dto/create-books_photo.dto';
import { UpdateBooksPhotoDto } from './dto/update-books_photo.dto';

@Injectable()
export class BooksPhotosService {
  create(createBooksPhotoDto: CreateBooksPhotoDto) {
    return 'This action adds a new booksPhoto';
  }

  findAll() {
    return `This action returns all booksPhotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booksPhoto`;
  }

  update(id: number, updateBooksPhotoDto: UpdateBooksPhotoDto) {
    return `This action updates a #${id} booksPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} booksPhoto`;
  }
}
