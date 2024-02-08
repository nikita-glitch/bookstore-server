import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/books.entity';
import { Repository } from 'typeorm';
import { BooksAuthor } from 'src/books_author/entities/books_author.entity';
import { BooksGenre } from 'src/books_genre/entities/books_genre.entity';
import { BooksPhoto } from 'src/books_photos/entities/books_photo.entity';
import { BooksRating } from 'src/books_rating/entities/books_rating.entity';

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
    const { title, description, price, author_name, genre_name } = createBookDto;
    const genre = await this.booksGenreRep.findOneBy({ genre_name: genre_name })
    const author = await this.booksAuthorRep.findOneBy({ author_name: author_name });
    if (!author || !genre) {
      throw new HttpException('Author or genre not found', HttpStatus.NOT_FOUND);
    }
    const book = this.bookRep.create({
      title: title,
      description: description,
      price: price,
      genre: genre,
      author: author
    })
    await this.bookRep.save(book);
  }

  async findAll() {
    return this.bookRep.findBy({})
  }

  async findOne(id: string) {
    
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto) {
  }

  async removeBook(id: number) {
    return `This action removes a #${id} book`;
  }

  async addPhoto() {

  }

  async addBookToCart() {

  }

  async addBookToFavorites() {

  }

  async removeBookFromCart() {

  }

  async removeBookFromFavorites() {
    
  }
}
