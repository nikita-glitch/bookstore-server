import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteBook } from './entities/favorite_book.entity';
import { Repository } from 'typeorm';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Book } from 'src/books/entities/books.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FavoriteBooksService {
  constructor(
    @InjectRepository(FavoriteBook)
    private favoriteBookRep: Repository<FavoriteBook>,
    @InjectRepository(Favorite)
    private favoriteRep: Repository<Favorite>,
    @InjectRepository(Book)
    private bookRep: Repository<Book>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(bookId: string, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const userFavorite = await this.favoriteRep.findOneBy({
      id: user.favoriteId,
    });
    if (!userFavorite) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isInFavorite = await this.favoriteBookRep.findOneBy({
      bookId: bookId,
      favoriteId: userFavorite.id,
    });
    if (isInFavorite) {
      throw new HttpException(
        'Book is alredy in favorite',
        HttpStatus.BAD_REQUEST,
      );
    }
    const book = await this.bookRep.findOne({
      where: { 
        id: bookId 
      },
      relations: {
        author: true,
        photos: true,
      },
    });
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    const favBook = this.favoriteBookRep.create({
      favorite: userFavorite,
      book: book,
    });
    await this.favoriteBookRep.save(favBook);
    return favBook;
  }

  async findAllBooks(favoriteId: string) {
    const booksInFavorite = this.favoriteBookRep.find({
      where: {
        favoriteId: favoriteId,
      },
      relations: {
        book: true,
      },
    });
    return booksInFavorite;
  }

  async remove(bookId: string, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const favorite = await this.favoriteRep.findOneBy({ id: user.favoriteId });
    if (!favorite) {
      throw new HttpException('Favorite not found', HttpStatus.NOT_FOUND);
    }
    const favBook = await this.favoriteBookRep.findOneBy({
      favoriteId: favorite.id,
      bookId: bookId,
    });
    if (!favBook) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    await this.favoriteBookRep.remove(favBook);
  }
}
