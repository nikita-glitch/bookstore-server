import { BooksRating } from "src/books_rating/entities/books_rating.entity";
import { Cart } from "src/cart/entities/cart.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { UsersInterface } from "src/interfaces/interfaces";
import { UserAvatar } from "src/user_avatar/entities/user_avatar.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User implements UsersInterface {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true})
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column()
  cartId: string;

  @Column()
  favoriteId: string;

  @Column({ nullable: true })
  avatarId: string

  @OneToOne(() => Cart, (cart) => cart.user, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  cart: Cart;

  @OneToOne(() => Favorite, (favorite) => favorite.user, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  favorite: Favorite;

  @OneToMany(() => Comment, (comment) => comment.user, )
  comments: Comment[]

  @OneToOne(() => UserAvatar, (avatar) => avatar.user)
  @JoinColumn()
  avatar: UserAvatar

  @OneToMany(() => BooksRating, (rating) => rating.user, {
    onDelete: 'CASCADE'
  })
  rating: BooksRating[]
}
