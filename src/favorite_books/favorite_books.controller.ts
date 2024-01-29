import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteBooksService } from './favorite_books.service';
import { CreateFavoriteBookDto } from './dto/create-favorite_book.dto';
import { UpdateFavoriteBookDto } from './dto/update-favorite_book.dto';
import { Roles } from 'src/decorator/role.decorator';

@Controller('favorite-books')
export class FavoriteBooksController {
  constructor(private readonly favoriteBooksService: FavoriteBooksService) {}

  @Post()
  create(@Body() createFavoriteBookDto: CreateFavoriteBookDto) {
    return this.favoriteBooksService.create(createFavoriteBookDto);
  }

  @Get()
  findAll() {
    return this.favoriteBooksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteBooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteBookDto: UpdateFavoriteBookDto) {
    return this.favoriteBooksService.update(+id, updateFavoriteBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteBooksService.remove(+id);
  }
}
