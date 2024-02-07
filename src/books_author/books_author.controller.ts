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
  UseGuards,
} from '@nestjs/common';
import { BooksAuthorService } from './books_author.service';
import { BooksAuthorDto } from './dto/books_author.dto';
import { Response } from 'express';
import { Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/Guards/authGuard';

@Controller('books-author')
export class BooksAuthorController {
  constructor(private readonly booksAuthorService: BooksAuthorService) {}

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Patch('')
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

  @UseGuards(AuthGuard)
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
