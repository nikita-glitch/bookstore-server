import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BooksGenreDto } from './dto/books_genre.dto';
import { Repository } from 'typeorm';
import { BooksGenre } from './entities/books_genre.entity';

@Injectable()
export class BooksGenreService {
  constructor(
    private booksGenreRep: Repository<BooksGenre>
  ) {}
  async create(booksGenreDto: BooksGenreDto) {
    const isNameExists = await this.booksGenreRep.findOneBy({ genre_name: booksGenreDto.genre_name });
    if (isNameExists) {
      throw new HttpException('Author already exists', HttpStatus.BAD_REQUEST);
    }
    const author = this.booksGenreRep.create(booksGenreDto);
    await this.booksGenreRep.save(author);
  }

  async findAll(): Promise<BooksGenre[]> {
    return this.booksGenreRep.find({})
  }


  async update(id: number, booksGenreDto: BooksGenreDto) {
    const isNameExists = this.booksGenreRep.findOneBy({ genre_name: booksGenreDto.genre_name})
    if (isNameExists) {
      throw new HttpException('Author already exists', HttpStatus.BAD_REQUEST);
    }
    await this.booksGenreRep.update(id, booksGenreDto);
  }

  async remove(id: number) {
    await this.booksGenreRep.delete(id);
  }
}
