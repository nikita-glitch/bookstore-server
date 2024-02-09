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

  async findAll(paginationOffset: number, sortOptions: SortOptionsInterface) {
    const { genreId, priceRange, sort } = sortOptions;
    // const [result, total] = await this.bookRep.findAndCount({
    //   where: {
    //     genreId: genreId,
    //     price: Between(priceRange.min, priceRange.max) 
    //   },
    //   relations: {
    //     author: true,
    //   },
    //   order: {
    //     // sortBy: "ASC"
    //   },
    //   take: 12,
    //   skip: paginationOffset,
    // });
    const [result, total] = await this.bookRep
    .createQueryBuilder('book')
    .from(Book, 'book')
    .where('book.genreId = :genreId', {genreId: genreId})
    .andWhere('book.price = :price', { price: priceRange.min })
    .andWhere('book.price = :price', { price: priceRange.max })
    .orderBy(sort, "ASC")
    .limit(12)
    .offset(paginationOffset)
    .getManyAndCount()

    // .orderBy(sort, "ASC")
    return {result, total}
  }

  async findOne(id: string) {}

  async updateBook(id: number, updateBookDto: UpdateBookDto) {}

  async removeBook(id: number) {
    return `This action removes a #${id} book`;
  }

  async addPhoto() {}

  async addBookToCart() {}

  async addBookToFavorites() {}

  async removeBookFromCart() {}

  async removeBookFromFavorites() {}
}
