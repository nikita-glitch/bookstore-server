import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { FavoriteBooksService } from './favorite_books.service';


@Controller('favorite-books')
export class FavoriteBooksController {
  constructor(private readonly favoriteBooksService: FavoriteBooksService) {}


}
