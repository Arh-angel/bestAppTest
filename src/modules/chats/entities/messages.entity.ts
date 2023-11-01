import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ChatsEntity } from './chats.entity';
import { UsersEntity } from 'src/modules/users/entities/users.entity';

@Entity('messages')
export class MessagesEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => ChatsEntity, (chat) => chat.message)
  @JoinColumn()
  chat: ChatsEntity;

  @ManyToOne(() => UsersEntity, (author) => author.message)
  @JoinColumn()
  author: UsersEntity;

  @Column()
  text: string;

  @CreateDateColumn({ nullable: true })
  created_at: Date;
}
