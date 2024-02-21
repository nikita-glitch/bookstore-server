import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBooksPhotoDto } from './dto/create-books_photo.dto';
import { UpdateBooksPhotoDto } from './dto/update-books_photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksPhoto } from './entities/books_photo.entity';
import { Repository } from 'typeorm';
import { Book } from 'src/books/entities/books.entity';
import { FileServise } from 'src/file_servise/file.service';

@Injectable()
export class BooksPhotosService {
  constructor(
    @InjectRepository(BooksPhoto)
    private photoRep: Repository<BooksPhoto>,
    @InjectRepository(Book)
    private bookRep: Repository<BooksPhoto>,
    private fileService: FileServise
  ) {}
  async create(file: Express.Multer.File, bookId: string) {
    const book = await this.bookRep.findOneBy({ id: bookId })
    if (!book) {
      throw new HttpException('User does not found', HttpStatus.NOT_FOUND);
    }    
    const picture = this.fileService.createFile(file)
    const photo = this.photoRep.create({
      photo: picture,
      book: book,
    });
    await this.photoRep.save(photo);
  }

  async findOne(id: string) {
    const photo  = this.photoRep.findOneBy({ id: id })
    return photo
  }
}
