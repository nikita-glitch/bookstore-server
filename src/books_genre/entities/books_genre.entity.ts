import { Book } from "src/books/entities/books.entity";
import { Genre } from "src/genre/entity/genre.entity";
import { Books_Genre_Interface } from "src/interfaces/interfaces";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class BooksGenre {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  genreId: string

  @Column({ nullable: true })
  bookId: string

  @ManyToOne(() => Book, (book) => book.book_genres)
  book: Book

  @ManyToOne(() => Genre, (genre) => genre.book_genres)
  genre: Genre


}
