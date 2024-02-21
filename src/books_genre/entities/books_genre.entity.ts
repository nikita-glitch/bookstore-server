import { Book } from "src/books/entities/books.entity";
import { Genre } from "src/genre/entity/genre.entity";
import { Books_Genre_Interface } from "src/interfaces/interfaces";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class BooksGenre implements Books_Genre_Interface {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  genre_name: string;

  @OneToMany(() => Book, (book) => book.genre)
  book: Book
  
  // @Column()
  // genreId: string

  // @ManyToOne(() => Book, (book) => book.book_genre)
  // book: Book

  // @ManyToOne(() => Genre, (genre) => genre.book_genres)
  // genre: Genre


}
