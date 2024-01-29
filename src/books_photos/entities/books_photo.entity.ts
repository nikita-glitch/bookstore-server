import { Book } from "src/books/entities/books.entity";
import { Books_Photos_Interface } from "src/interfaces/interfaces";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BooksPhoto implements Books_Photos_Interface {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  photo: string;

  @Column()
  bookId: string;

  @ManyToOne(() => Book, (book) => book.photos)
  book: Book
}
