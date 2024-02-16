import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBooksPhotoDto } from './dto/create-books_photo.dto';
import { UpdateBooksPhotoDto } from './dto/update-books_photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksPhoto } from './entities/books_photo.entity';
import { Repository } from 'typeorm';
import { Book } from 'src/books/entities/books.entity';

@Injectable()
export class BooksPhotosService {
  constructor(
    @InjectRepository(BooksPhoto)
    private photoRep: Repository<BooksPhoto>,
    @InjectRepository(Book)
    private bookRep: Repository<BooksPhoto>
  ) {}
  async create(photoName: string, dataBuffer: Buffer, bookId: string) {
    const book = await this.bookRep.findOneBy({ id: bookId })
    if (!book) {
      throw new HttpException('User does not found', HttpStatus.NOT_FOUND);
    }    
    const photo = this.photoRep.create({
      photoName,
      data: dataBuffer,
      book: book
    });
    await this.photoRep.save(photo);
  }

  findOne(id: number) {
    return `This action returns a #${id} booksPhoto`;
  }
}
