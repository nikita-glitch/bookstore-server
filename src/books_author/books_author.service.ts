import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BooksAuthorDto } from './dto/books_author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksAuthor } from './entities/books_author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksAuthorService {
  constructor(
    @InjectRepository(BooksAuthor)
    private booksAuthorRep: Repository<BooksAuthor>
  ) {}
  async create(booksAuthorDto: BooksAuthorDto) {
    const isNameExists = await this.booksAuthorRep.findOneBy({ author_name: booksAuthorDto.author_name });
    if (isNameExists) {
      throw new HttpException('Author alredy exist', HttpStatus.BAD_REQUEST);
    }
    const author = this.booksAuthorRep.create(booksAuthorDto);
    await this.booksAuthorRep.save(author);
  }

  async findAll(): Promise<BooksAuthor[]> {
    return this.booksAuthorRep.find({})
  }

  async findOne(id: string): Promise<BooksAuthor> {
    return this.booksAuthorRep.findOneBy({ id: id })
  }

  async update(id: number, booksAuthorDto: BooksAuthorDto) {
    const isNameExists = await this.booksAuthorRep.findOneBy({ author_name: booksAuthorDto.author_name})
    if (isNameExists) {
      throw new HttpException('Author already exists', HttpStatus.BAD_REQUEST);
    }
    await this.booksAuthorRep.update(id, booksAuthorDto);
  }

  async remove(id: number) {
    await this.booksAuthorRep.delete(id);
  }
}
