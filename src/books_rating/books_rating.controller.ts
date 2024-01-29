import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksRatingService } from './books_rating.service';
import { CreateBooksRatingDto } from './dto/create-books_rating.dto';
import { UpdateBooksRatingDto } from './dto/update-books_rating.dto';

@Controller('books-rating')
export class BooksRatingController {
  constructor(private readonly booksRatingService: BooksRatingService) {}

  @Post()
  create(@Body() createBooksRatingDto: CreateBooksRatingDto) {
    return this.booksRatingService.create(createBooksRatingDto);
  }

  @Get()
  findAll() {
    return this.booksRatingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksRatingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBooksRatingDto: UpdateBooksRatingDto) {
    return this.booksRatingService.update(+id, updateBooksRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksRatingService.remove(+id);
  }
}
