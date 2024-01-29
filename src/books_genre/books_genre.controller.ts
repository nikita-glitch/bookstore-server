import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { BooksGenreService } from './books_genre.service';
import { BooksGenreDto } from './dto/books_genre.dto';
import { Response } from 'express';
import { IsPublic } from 'src/decorator/auth.decorator';
import { Roles } from 'src/decorator/role.decorator';


@Controller('books-genre')
export class BooksGenreController {
  constructor(private readonly booksGenreService: BooksGenreService) {}

  @IsPublic(false)
  @Roles('admin')
  @Post()
  async create(
    @Body()
    booksAuthorDto: BooksGenreDto,
    @Res() res: Response,
  ) {
    this.booksGenreService.create(booksAuthorDto);
    res.status(HttpStatus.CREATED).json();
  }

  @Get()
  async findAll(@Res() res: Response) {
    this.booksGenreService.findAll();
    res.status(HttpStatus.OK).json();
  }

  @IsPublic(false)
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

  @IsPublic(false)
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
