import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { FavoriteBooksService } from 'src/favorite_books/favorite_books.service';

@Injectable()
export class FavoritesService {
  constructor(
    private favoriteBooksService: FavoriteBooksService,
    @InjectRepository(Favorite)
    private favoritesRep: Repository<Favorite>,
  ) {}
  async create(): Promise<Favorite> {
    const favorites = this.favoritesRep.create();
    await this.favoritesRep.save(favorites);
    return favorites;
  }

  async getBooksInFavorite(favoriteId: string) {
    const favorite = await this.favoritesRep.findOne({
      where: {
        id: favoriteId,
      },
      relations: {
        favoriteBooks: {
          book: {
            author: true,
            photos: true,
          },
        },
      },
    });
    if (!favorite) {
      throw new HttpException('Favorite not found', HttpStatus.NOT_FOUND);
    }

    return favorite;
  }

  async addBookToFavorite(bookId: string, userId: string) {
    return this.favoriteBooksService.create(bookId, userId);
  }

  async removeBookFromFavorite(bookId: string, userId: string) {
    await this.favoriteBooksService.remove(bookId, userId);
  }
}
