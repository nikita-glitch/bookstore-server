import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, HttpStatus, Res } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/decorator/role.decorator';
import { AuthRequired } from 'src/decorator/auth.decorator';
import { Response } from 'express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @AuthRequired(false)
  @Roles('admin')
  @Post()
  async create(
    @Body() 
    createBookDto: CreateBookDto
    ) {
    return this.booksService.addBook(createBookDto);
  }

  @Get()
  async findAll(
    //@Query()
  ) {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') 
    id: string
    ) {
    return this.booksService.findOne(+id);
  }

  @AuthRequired(false)
  @Roles('admin')
  @Patch(':id')
  async update(
    @Param('id') 
    id: string, 
    @Body() 
    updateBookDto: UpdateBookDto
    ) {
    return this.booksService.updateBook(+id, updateBookDto);
  }

  @AuthRequired(false)
  @Roles('admin')
  @Delete(':id')
  async remove(
    @Param('id') 
    id: string
    ) {
    return this.booksService.removeBook(+id);
  }

  @AuthRequired(false)
  @Roles('admin')
  @Put('')
  async addPhoto(
    
  ) {

  }

  @AuthRequired(false)
  @Post()
  async addComment(

  ) {

  }

  @AuthRequired(false)
  @Put()
  async setRating(

  ) {

  }
  
  @Delete('')
  async removeFromCart(
    @Param()
    @Body()
    @Res() res: Response
  ) {
    return res.status(HttpStatus.OK).json()
  }

  @Delete('')
  async removeFromFavorite(
    @Param()
    @Body()
    @Res() res: Response
  ) {
    return res.status(HttpStatus.OK).json()
  }

  @Patch('')
  async addToCart(
    @Param()
    @Body()
    @Res() res: Response
  ) {
    return res.status(HttpStatus.OK).json()
  }

  @Patch('')
  async addToFavorite(
    @Param()
    @Body()
    @Res() res: Response
  ) {
    return res.status(HttpStatus.OK).json()
  }
}
