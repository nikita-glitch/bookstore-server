import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/decorator/role.decorator';
import { Response } from 'express';
import { AuthGuard } from 'src/Guards/authGuard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Post()
  async create(
    @Body() 
    createBookDto: CreateBookDto
    ) {
    return this.booksService.addBook(createBookDto);
  }

  @Get('')
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
    return this.booksService.findOne(id);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(
    @Param('id') 
    id: string
    ) {
    return this.booksService.removeBook(+id);
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Put('')
  async addPhoto(
    
  ) {

  }

  @UseGuards(AuthGuard)
  @Post()
  async addComment(

  ) {

  }

  @UseGuards(AuthGuard)
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
