import { BooksAuthor } from "src/books_author/entities/books_author.entity";
import { BooksGenre } from "src/books_genre/entities/books_genre.entity";
import { BooksPhoto } from "src/books_photos/entities/books_photo.entity";
import { BooksRating } from "src/books_rating/entities/books_rating.entity";
import { CartBook } from "src/cart_books/entities/cart_book.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { FavoriteBook } from "src/favorite_books/entities/favorite_book.entity";
import { BooksInterface } from "src/interfaces/interfaces";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Book implements BooksInterface {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @OneToOne(() => BooksAuthor, (author) => author.book)
  author: BooksAuthor;

  @OneToOne(() => BooksGenre, (genre) => genre.book)
  genre: BooksGenre;

  @OneToOne(() =>  BooksRating, (rating) => rating.book)
  rating: BooksRating;

  @OneToMany(() => Comment, (comment) => comment.book)
  comments: Comment[]

  @OneToMany(() => BooksPhoto, (photo) => photo.book, {
    onDelete: 'CASCADE'
  })
  photos: BooksPhoto[]

  @OneToOne(() => CartBook, (cartBook) => cartBook.book)
  cartBook: CartBook

  @OneToOne(() => FavoriteBook, (favoriteBook) => favoriteBook.book)
  favoriteBook: FavoriteBook
}