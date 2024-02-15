import { Book } from "src/books/entities/books.entity";
import { Books_Rating_Interface } from "src/interfaces/interfaces";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class BooksRating implements Books_Rating_Interface {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: number;

  @Column({ nullable: true })
  bookId: string

  @Column()
  userId: string

  @ManyToOne(() => Book, (book) => book.rating)
  book: Book

  @ManyToOne(() => User, (user) => user.rating)
  user: User
}
