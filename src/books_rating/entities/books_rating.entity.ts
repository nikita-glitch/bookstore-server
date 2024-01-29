import { Book } from "src/books/entities/books.entity";
import { Books_Rating_Interface } from "src/interfaces/interfaces";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class BooksRating implements Books_Rating_Interface {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @Column({ nullable: true })
  bookId: string

  @OneToOne(() => Book, (book) => book.rating)
  @JoinColumn()
  book: Book
}
