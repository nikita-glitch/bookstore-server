import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFavoriteBookDto } from './dto/create-favorite_book.dto';
import { UpdateFavoriteBookDto } from './dto/update-favorite_book.dto';
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
  async create(createFavoriteBookDto: CreateFavoriteBookDto, userId: string) {
    const { bookId } = createFavoriteBookDto;
    const isInFavorite = await this.favoriteBookRep.findOneBy({ bookId: bookId })
    if (isInFavorite) {
      throw new HttpException('Book is alredy in favorite', HttpStatus.BAD_REQUEST);
    }
    const userFavorite = await this.favoriteRep.findOneBy({ userId: userId });
    if (!userFavorite) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
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
