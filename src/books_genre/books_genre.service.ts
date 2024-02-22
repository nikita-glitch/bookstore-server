import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BooksGenreDto } from './dto/books_genre.dto';
import { Repository } from 'typeorm';
import { BooksGenre } from './entities/books_genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/genre/entity/genre.entity';
import { Book } from 'src/books/entities/books.entity';

@Injectable()
export class BooksGenreService {
  constructor(
    @InjectRepository(BooksGenre)
    private booksGenreRep: Repository<BooksGenre>,
    @InjectRepository(Genre)
    private genreRep: Repository<Genre>,
    @InjectRepository(Book)
    private bookRep: Repository<Book>
  ) {}
  async create(bookId: string, genre_name: string) {
    const book = await this.bookRep.findOneBy({ id: bookId });
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    const genre = await this.genreRep.findOneBy({ genre_name: genre_name });
    if (!genre) {
      throw new HttpException('Genre not found', HttpStatus.NOT_FOUND);
    }
    const book_genre = this.booksGenreRep.create({
      book: book,
      genre: genre
    });
    await this.booksGenreRep.save(book_genre);
  }

  async findAll(): Promise<BooksGenre[]> {
    return this.booksGenreRep.find({})
  }

  async update(id: number, booksGenreDto: BooksGenreDto) {
    // const isNameExists = this.booksGenreRep.findOneBy({ genre_name: booksGenreDto.genre_name})
    // if (isNameExists) {
    //   throw new HttpException('Author already exists', HttpStatus.BAD_REQUEST);
    // }
    // await this.booksGenreRep.update(id, booksGenreDto);
  }

  async remove(id: number) {
    await this.booksGenreRep.delete(id);
  }
}
