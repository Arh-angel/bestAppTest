import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { MessagesEntity } from './messages.entity';
import { UsersEntity } from 'src/modules/users/entities/users.entity';

@Entity('chats')
export class ChatsEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => UsersEntity, (users) => users.chats)
  @JoinTable()
  users: UsersEntity[];

  @OneToMany(() => MessagesEntity, (message) => message.chat)
  message: MessagesEntity[];

  @CreateDateColumn({ nullable: true })
  created_at: Date;
}
