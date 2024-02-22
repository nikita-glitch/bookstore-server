import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { BooksGenreService } from './books_genre.service';
import { BooksGenreDto } from './dto/books_genre.dto';
import { Response } from 'express';
import { Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/Guards/authGuard';


@Controller('books-genre')
export class BooksGenreController {
  constructor(private readonly booksGenreService: BooksGenreService) {}

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Post()
  async create(
    @Body()
    genreId: string, 
    bookId: string,
    @Res() res: Response,
  ) {
    this.booksGenreService.create(bookId, genreId);
    res.status(HttpStatus.CREATED).json({message: "created"});
  }

  @Get('')
  async findAll(@Res() res: Response) {
    const genres = await this.booksGenreService.findAll();
    res.status(HttpStatus.OK).json(genres);
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Patch(':id')
  async update(
    @Param('id')
    id: string,
    @Body()
    booksAuthorDto: BooksGenreDto,
    @Res() res: Response,
  ) {
    this.booksGenreService.update(+id, booksAuthorDto);
    res.status(HttpStatus.OK).json();
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(
    @Param('id')
    id: string,
    @Res() res: Response,
  ) {
    this.booksGenreService.remove(+id);
    res.status(HttpStatus.OK).json();
  }
}
