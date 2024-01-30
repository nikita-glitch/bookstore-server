import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { BooksAuthorService } from './books_author.service';
import { BooksAuthorDto } from './dto/books_author.dto';
import { Response } from 'express';
import { AuthRequired } from 'src/decorator/auth.decorator';
import { Roles } from 'src/decorator/role.decorator';

@Controller('books-author')
export class BooksAuthorController {
  constructor(private readonly booksAuthorService: BooksAuthorService) {}

  @AuthRequired(false)
  @Roles('admin')
  @Post()
  async create(
    @Body()
    booksAuthorDto: BooksAuthorDto,
    @Res() res: Response,
  ) {
    this.booksAuthorService.create(booksAuthorDto);
    res.status(HttpStatus.CREATED).json();
  }

  @Get()
  async findAll(@Res() res: Response) {
    this.booksAuthorService.findAll();
    res.status(HttpStatus.OK).json();
  }

  @AuthRequired(false)
  @Roles('admin')
  @Patch(':id')
  async update(
    @Param('id')
    id: string,
    @Body()
    booksAuthorDto: BooksAuthorDto,
    @Res() res: Response,
  ) {
    this.booksAuthorService.update(+id, booksAuthorDto);
    res.status(HttpStatus.OK).json();
  }

  @AuthRequired(false)
  @Roles('admin')
  @Delete(':id')
  async remove(
    @Param('id')
    id: string,
    @Res() res: Response,
  ) {
    this.booksAuthorService.remove(+id);
    res.status(HttpStatus.OK).json();
  }
}
