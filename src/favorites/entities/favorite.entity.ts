import { FavoriteBook } from "src/favorite_books/entities/favorite_book.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Favorite {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string

  @OneToOne(() => User, (user) => user.favorite)
  @JoinColumn()
  user: User

  @OneToMany(() => FavoriteBook, (favoriteBook) => favoriteBook.favorite, {
    onDelete: 'CASCADE'
  })
  favoriteBooks: FavoriteBook[]

}
