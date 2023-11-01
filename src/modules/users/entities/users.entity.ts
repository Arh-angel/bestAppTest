import { ChatsEntity } from 'src/modules/chats/entities/chats.entity';
import { MessagesEntity } from 'src/modules/chats/entities/messages.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  username: string;

  @ManyToMany(() => ChatsEntity, (chats) => chats.users)
  chats: ChatsEntity[];

  @OneToMany(() => MessagesEntity, (message) => message.author)
  message: MessagesEntity[];

  @CreateDateColumn({ nullable: true })
  created_at: Date;
}
