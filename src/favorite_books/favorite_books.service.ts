import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteBook } from './entities/favorite_book.entity';
import { Repository } from 'typeorm';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Book } from 'src/books/entities/books.entity';

@Injectable()
export class FavoriteBooksService {
  constructor(
    @InjectRepository(FavoriteBook)
    private favoriteBookRep: Repository<FavoriteBook>,
    @InjectRepository(Favorite)
    private favoriteRep: Repository<Favorite>,
    @InjectRepository(Book)
    private bookRep: Repository<Book>,
  ) {}
  async create(bookId: string, userId: string) {
    

    const userFavorite = await this.favoriteRep.findOneBy({ userId: userId });
    if (!userFavorite) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isInFavorite = await this.favoriteBookRep.findOneBy({ bookId: bookId, favoriteId: userFavorite.id })
    if (isInFavorite) {
      throw new HttpException('Book is alredy in favorite', HttpStatus.BAD_REQUEST);
    }
    const book = await this.bookRep.findOneBy({ id: bookId })
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    const favBook = this.favoriteBookRep.create({
      favorite: userFavorite,
      book: book
    })
    await this.favoriteBookRep.save(favBook)
  }

  async findAllBooks(favoriteId: string) {
    const booksInFavorite = this.favoriteBookRep.find({
      where: {
        favoriteId: favoriteId,
      },
      relations: {
        book: true
      }
    })
    return booksInFavorite
  }

  async remove(bookId: string, userId: string) {
    const favorite = await this.favoriteRep.findOneBy({ userId: userId })
    if (!favorite) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const favBook = await this.favoriteBookRep.findOneBy({
      favoriteId: favorite.id,
      bookId: bookId
    })
    await this.favoriteBookRep.remove(favBook);
  }
}
