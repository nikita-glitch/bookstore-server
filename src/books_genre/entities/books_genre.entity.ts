import { Book } from "src/books/entities/books.entity";
import { Books_Genre_Interface } from "src/interfaces/interfaces";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class BooksGenre implements Books_Genre_Interface {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  genre_name: string;

  @Column({ nullable: true })
  bookId: string

  @OneToOne(() => Book, (book) => book.genre)
  @JoinColumn()
  book: Book
}
