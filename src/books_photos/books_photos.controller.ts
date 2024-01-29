import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksPhotosService } from './books_photos.service';
import { CreateBooksPhotoDto } from './dto/create-books_photo.dto';
import { UpdateBooksPhotoDto } from './dto/update-books_photo.dto';

@Controller('books-photos')
export class BooksPhotosController {
  constructor(private readonly booksPhotosService: BooksPhotosService) {}

  @Post()
  create(@Body() createBooksPhotoDto: CreateBooksPhotoDto) {
    return this.booksPhotosService.create(createBooksPhotoDto);
  }

  @Get()
  findAll() {
    return this.booksPhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksPhotosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBooksPhotoDto: UpdateBooksPhotoDto) {
    return this.booksPhotosService.update(+id, updateBooksPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksPhotosService.remove(+id);
  }
}
