import { Book } from "src/books/entities/books.entity";
import { Books_Author_Interface } from "src/interfaces/interfaces";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BooksAuthor implements Books_Author_Interface {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  author_name: string;

  @Column({ nullable: true })
  bookId: string

  @OneToOne(() => Book, (book) => book.author)
  @JoinColumn()
  book: Book
}
