import { Book } from 'src/books/entities/books.entity';
import { CommentInterface } from 'src/interfaces/interfaces';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment implements CommentInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  userId: string;

  @Column()
  bookId: string;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Book, (book) => book.comments)
  book: Book;
}
