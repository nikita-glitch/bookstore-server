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

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRep: Repository<Book>,
    @InjectRepository(BooksAuthor)
    private booksAuthorRep: Repository<BooksAuthor>,
    @InjectRepository(BooksGenre)
    private booksGenreRep: Repository<BooksGenre>,
    @InjectRepository(BooksPhoto)
    private booksPhotoRep: Repository<BooksPhoto>,
    @InjectRepository(BooksRating)
    private booksRatingRep: Repository<BooksRating>,
  ) {}
  async addBook(createBookDto: CreateBookDto) {
    const { title, description, price, author_name, genre_name } =
      createBookDto;
    const genre = await this.booksGenreRep.findOneBy({
      genre_name: genre_name,
    });
    const author = await this.booksAuthorRep.findOneBy({
      author_name: author_name,
    });
    if (!author || !genre) {
      throw new HttpException(
        'Author or genre not found',
        HttpStatus.NOT_FOUND,
      );
    }
    const book = this.bookRep.create({
      title: title,
      description: description,
      price: price,
      genre: genre,
      author: author,
    });

    await this.bookRep.save(book);
  }

  async findAll(
    paginationOffset: number,
    searchString?: string,
    sortOptions?: SortOptionsInterface,
  ): Promise<{ result: Book[]; total: number }> {
    const builder = this.bookRep
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author');
      //.leftJoinAndSelect('book.rating', 'rating');

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
        builder.andWhere('book.genreId = :genreId', { genreId: genreId });
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
        rating: true
      },
    });
    return book;
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto) {}

  async removeBook(id: number) {
    return `This action removes a #${id} book`;
  }

  async addPhoto() {}
}
