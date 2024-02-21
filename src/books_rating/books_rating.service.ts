import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksRating } from './entities/books_rating.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/books.entity';

@Injectable()
export class BooksRatingService {
  constructor(
    @InjectRepository(BooksRating)
    private ratingRep: Repository<BooksRating>,
    @InjectRepository(User)
    private userRep: Repository<User>,
    @InjectRepository(Book)
    private bookRep: Repository<Book>,
  ) {}

  async setRating(userID: string, bookId: string, ratingValue: number) {
    let userRating = null;
    const isRatingSetted = await this.ratingRep.findOneBy({
      userId: userID,
      bookId: bookId,
    });
    if (isRatingSetted) {
      await this.ratingRep.update(isRatingSetted, {
        value: ratingValue,
      });
      userRating = await this.ratingRep.findOneBy({
        userId: userID,
        bookId: bookId,
      });
      
    } else {
      const [user, book] = await Promise.all([
        this.userRep.findOneBy({ id: userID }),
        this.bookRep.findOneBy({ id: bookId }),
      ]);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      if (!book) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
      const userRatingOfBook = this.ratingRep.create({
        user: user,
        book: book,
        value: ratingValue,
      });
      await this.ratingRep.save(userRatingOfBook);
      userRating = userRatingOfBook;
    }    
    const ratingOfBook = await this.countRatingForBook(bookId);
    return { userRatingOfBook: userRating, ratingOfBook: ratingOfBook };
  }

  async countRatingForBook(bookId: string) {
    const averageRating = await this.ratingRep.average('value', {
      bookId: bookId,
    });
    if (!averageRating) {
      return 0
    }
    const bookToUpdate = await this.bookRep.findOneBy({ id: bookId });
    this.bookRep.update(bookToUpdate, { bookRating: averageRating });
    return averageRating
  }
}
