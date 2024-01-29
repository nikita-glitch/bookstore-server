import { Book } from "src/books/entities/books.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FavoriteBook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  favoriteId: string;

  @Column()
  bookId: string;

  @ManyToOne(() => Favorite, (cart) => cart.favoriteBooks, {
    onDelete: 'CASCADE'
  })
  favorite: Favorite

  @OneToOne(() => Book, (book) => book.favoriteBook)
  @JoinColumn()
  book: Book
}
