import { BooksGenre } from "src/books_genre/entities/books_genre.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Genre {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  genre_name: string;

  // @OneToMany(() => BooksGenre, (book_genre) => book_genre.genre)
  // book_genres: BooksGenre[]
}