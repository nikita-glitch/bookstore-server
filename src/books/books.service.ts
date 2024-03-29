import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/books.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { BooksAuthor } from 'src/books_author/entities/books_author.entity';
import { BooksGenre } from 'src/books_genre/entities/books_genre.entity';
import { BooksPhoto } from 'src/books_photos/entities/books_photo.entity';
import { BooksRating } from 'src/books_rating/entities/books_rating.entity';
import { SortOptionsInterface } from 'src/interfaces/interfaces';
import { title } from 'process';
import { BooksRatingService } from 'src/books_rating/books_rating.service';
import { CommentsService } from 'src/comments/comments.service';
import { BooksPhotosService } from 'src/books_photos/books_photos.service';
import { Genre } from 'src/genre/entity/genre.entity';
import { BooksGenreService } from 'src/books_genre/books_genre.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRep: Repository<Book>,
    @InjectRepository(BooksAuthor)
    private booksAuthorRep: Repository<BooksAuthor>,
    @InjectRepository(BooksGenre)
    private genreRep: Repository<Genre>,
    private booksPhotoService: BooksPhotosService,
    private ratingService: BooksRatingService,
    private commentsService: CommentsService,
    private booksGenreService: BooksGenreService,
  ) {}
  async addBook(createBookDto: CreateBookDto) {
    const { title, description, price, author_name, genre_name } =
      createBookDto;

    const author = await this.booksAuthorRep.findOneBy({
      author_name: author_name,
    });

    if (!author) {
      throw new HttpException(
        'Author or genre not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const book = this.bookRep.create({
      title: title,
      description: description,
      price: price,
      author: author,
    });
    
    await this.bookRep.save(book);

    genre_name.forEach((name) => {
      this.booksGenreService.create(book.id, name);
    });
  }

  async updateGenres(genre_names: string[], bookId: string) {
    const book = await this.bookRep.findOneBy({ id: bookId });
    if (!book) {
      throw new HttpException('Book does not found', HttpStatus.NOT_FOUND);
    }
    genre_names.forEach((name) => {
      this.booksGenreService.create(book.id, name);
    });
  }

  async findAll(
    paginationOffset: number,
    searchString?: string,
    sortOptions?: SortOptionsInterface,
  ): Promise<{ result: Book[]; total: number }> {
    const builder = this.bookRep
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .leftJoinAndSelect(
        'book.comments',
        'comments',
        'comments.bookId = book.id',
      )
      .leftJoinAndSelect('comments.user', 'user', 'comments.userId = user.id')
      .leftJoinAndSelect('user.avatar', 'avatar', 'user.avatarId = avatar.id')
      .leftJoinAndSelect('book.rating', 'rating', 'rating.bookId = book.id')
      .leftJoinAndSelect('book.photos', 'photos')
      .leftJoinAndSelect(
        'book.book_genres',
        'book_genres'
      );

    if (searchString) {
      builder
        .where('book.title LIKE :searchString', {
          searchString: `%${searchString}%`,
        })
        .orWhere('book.description LIKE :searchString', {
          searchString: `%${searchString}%`,
        });
    }
    if (sortOptions) {
      const { genreId, priceRange, sort } = sortOptions;

      if (genreId) {
        builder.where('book_genres.genreId IN (:...genreIds)', { genreIds: genreId });
      }

      if (priceRange) {
        builder.andWhere('book.price >= :min AND book.price <= :max', {
          min: parseInt(priceRange[0]),
          max: parseInt(priceRange[1]),
        });
      }

      if (sort) {
        if (sort !== 'author.author_name') {
          builder.orderBy(`book.${sort}`, 'DESC');
        } else {
          builder.orderBy(sort, 'DESC');
        }
      }
    }
    const [result, total] = await builder
      .take(12)
      .skip((paginationOffset - 1) * 12)
      .getManyAndCount();
    return { result, total };
  }

  async findOne(id: string) {
    const book = this.bookRep.findOne({
      where: { id: id },
      relations: {
        author: true,
        rating: true,
        photos: true,
        comments: {
          user: {
            avatar: true,
          },
        },
      },
    });
    return book;
  }

  async countRating(bookId: string) {
    return this.ratingService.countRatingForBook(bookId);
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto) {}

  async removeBook(id: number) {
    return `This action removes a #${id} book`;
  }

  async addPhoto(file: Express.Multer.File, bookId: string) {
    const book = await this.bookRep.findOneBy({ id: bookId });
    if (!book) {
      throw new HttpException('Book does not found', HttpStatus.NOT_FOUND);
    }
    await this.booksPhotoService.create(file, bookId);
  }

  async getComments(bookId: string) {
    return this.commentsService.getBookComments(bookId);
  }

  async getBookPhoto(bookId: string) {
    const book = await this.bookRep.findOneBy({ id: bookId });
    if (!book) {
      throw new HttpException('Book does not found', HttpStatus.NOT_FOUND);
    }
    return this.booksPhotoService.findOne(book.photos.id);
  }
}
