import { Injectable } from '@nestjs/common';
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
    const isRatingSetted = await this.ratingRep.findOneBy({
      userId: userID,
      bookId: bookId,
    });
    if (isRatingSetted) {
      await this.ratingRep.update(isRatingSetted, {
        value: ratingValue,
      });
      return;
    }
    const user = await this.userRep.findOneBy({ id: userID });
    if (!user) {
    }
    const book = await this.bookRep.findOneBy({ id: bookId });
    if (!book) {
    }
    const userRatingOfBook = this.ratingRep.create({
      user: user,
      book: book,
      value: ratingValue,
    });
    Promise.all([
      this.ratingRep.save(userRatingOfBook),
      this.countRatingForBook(bookId),
    ]);

  }

  async countRatingForBook(bookId: string) {
    const averageRating = await this.ratingRep.average('value', {
      bookId: bookId,
    });
    const bookToUpdate = await this.bookRep.findOneBy({ id: bookId });
    await this.bookRep.update(bookToUpdate, { bookRating: averageRating });

    // const averageRating = this.ratingRep
    // .createQueryBuilder("rating")
    // .where('books_rating.bookId = :bookId', { bookId: bookId })
    // .select("AVG(rating.value)", "average")
    // .getRawOne();
  }
}
