import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/decorator/role.decorator';
import { IsPublic } from 'src/decorator/auth.decorator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @IsPublic(false)
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

  @IsPublic(false)
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

  @IsPublic(false)
  @Roles('admin')
  @Delete(':id')
  async remove(
    @Param('id') 
    id: string
    ) {
    return this.booksService.removeBook(+id);
  }

  @IsPublic(false)
  @Roles('admin')
  @Put('')
  async addPhoto(
    
  ) {

  }

  @IsPublic(false)
  @Post()
  async addComment(

  ) {

  }

  @IsPublic(false)
  @Put()
  async setRating(

  ) {

  }
}
