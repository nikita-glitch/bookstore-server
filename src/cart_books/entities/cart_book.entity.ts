import { Book } from "src/books/entities/books.entity";
import { Cart } from "src/cart/entities/cart.entity";
import { CartBookInterface } from "src/interfaces/interfaces";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartBook implements CartBookInterface {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  cartId: string;

  @Column()
  bookId: string;

  @ManyToOne(() => Cart, (cart) => cart.cartBooks)
  cart: Cart

  @OneToOne(() => Book, (book) => book.cartBook)
  @JoinColumn()
  book: Book
}
