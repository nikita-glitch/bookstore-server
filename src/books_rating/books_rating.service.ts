import { Injectable } from '@nestjs/common';
import { CreateBooksRatingDto } from './dto/create-books_rating.dto';
import { UpdateBooksRatingDto } from './dto/update-books_rating.dto';

@Injectable()
export class BooksRatingService {
  create(createBooksRatingDto: CreateBooksRatingDto) {
    return 'This action adds a new booksRating';
  }

  findAll() {
    return `This action returns all booksRating`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booksRating`;
  }

  update(id: number, updateBooksRatingDto: UpdateBooksRatingDto) {
    return `This action updates a #${id} booksRating`;
  }

  remove(id: number) {
    return `This action removes a #${id} booksRating`;
  }
}
