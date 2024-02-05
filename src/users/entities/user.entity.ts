import { Cart } from "src/cart/entities/cart.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Favorite } from "src/favorites/entities/favorite.entity";
import { UsersInterface } from "src/interfaces/interfaces";
import { UserAvatar } from "src/user_avatar/entities/user_avatar.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToOne(() => Cart, (cart) => cart.user, {
    onDelete: 'CASCADE'
  })
  cart: Cart;

  @OneToOne(() => Favorite, (favorite) => favorite.user, {
    onDelete: 'CASCADE'
  })
  favorite: Favorite;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]

  @OneToOne(() => UserAvatar, (avatar) => avatar.user, {
    onDelete: 'CASCADE'
  })
  avatar: UserAvatar
}
