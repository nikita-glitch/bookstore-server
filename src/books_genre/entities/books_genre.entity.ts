import { Book } from "src/books/entities/books.entity";
import { Books_Genre_Interface } from "src/interfaces/interfaces";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class BooksGenre implements Books_Genre_Interface {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  genre_name: string;

  @OneToMany(() => Book, (book) => book.genre)
  book: Book
}
