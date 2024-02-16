import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksPhotosService } from './books_photos.service';
import { CreateBooksPhotoDto } from './dto/create-books_photo.dto';
import { UpdateBooksPhotoDto } from './dto/update-books_photo.dto';

@Controller('books-photos')
export class BooksPhotosController {
  constructor(private readonly booksPhotosService: BooksPhotosService) {}




}
