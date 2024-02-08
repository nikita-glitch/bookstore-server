import { CartBook } from "src/cart_books/entities/cart_book.entity";
import { CartInterface } from "src/interfaces/interfaces";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Cart implements CartInterface {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  is_ordered: boolean;

  @Column({ default: false })
  has_paid: boolean;

  @OneToMany(() => CartBook, (cartBook) => cartBook.cart, {
    onDelete: 'CASCADE'
  })
  cartBooks: CartBook[]

  @OneToOne(() => User, (user) => user.cart)
  user: User
}
