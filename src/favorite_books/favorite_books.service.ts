import { Injectable } from '@nestjs/common';
import { CreateFavoriteBookDto } from './dto/create-favorite_book.dto';
import { UpdateFavoriteBookDto } from './dto/update-favorite_book.dto';

@Injectable()
export class FavoriteBooksService {
  create(createFavoriteBookDto: CreateFavoriteBookDto) {
    return 'This action adds a new favoriteBook';
  }

  findAll() {
    return `This action returns all favoriteBooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favoriteBook`;
  }

  update(id: number, updateFavoriteBookDto: UpdateFavoriteBookDto) {
    return `This action updates a #${id} favoriteBook`;
  }

  remove(id: number) {
    return `This action removes a #${id} favoriteBook`;
  }
}
