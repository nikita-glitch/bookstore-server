import { User_Avatar_Interface } from "src/interfaces/interfaces";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserAvatar implements User_Avatar_Interface{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  avatarName: string;

  @Column({ type: 'bytea' })
  data: Uint8Array;

  @Column()
  userId: string;

  @OneToOne(() => User, (user) => user.avatar, )
  @JoinColumn()
  user: User
}
