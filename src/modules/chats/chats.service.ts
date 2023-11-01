import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { ChatsEntity } from './entities/chats.entity';
import { MessagesEntity } from './entities/messages.entity';
import { AddChatDto } from './inputs/add.chat.dto';
import { UsersEntity } from '../users/entities/users.entity';
import { AddChatViewModel } from './view/add.chat.view.model';
import { AddMessageDto } from './inputs/add.message.dto';
import { AddMessageViewModel } from './view/add.message.view.model';
import { GetChatsDto } from './inputs/get.chats.dto';
import { GetMessagesDto } from './inputs/get.messages.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatsEntity)
    private readonly chatsRepository: Repository<ChatsEntity>,
    @InjectRepository(MessagesEntity)
    private readonly messagesRepository: Repository<MessagesEntity>,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async addChat(dto: AddChatDto): Promise<AddChatViewModel> {
    const chat: ChatsEntity = await this.chatsRepository.findOne({
      where: { name: dto.name },
    });

    if (chat)
      throw new BadRequestException('Чат с таким названием уже существует!');

    const users: UsersEntity[] = await this.usersRepository.find({
      where: { id: In(dto.users) },
    });

    if (users.length === 0)
      throw new NotFoundException('Пользователи не найдены!');

    const newChat = await this.chatsRepository.save({
      id: randomUUID(),
      name: dto.name,
      users: users,
    });

    return { id: newChat.id };
  }

  async addMessage(dto: AddMessageDto): Promise<AddMessageViewModel> {
    const chat: ChatsEntity = await this.chatsRepository.findOne({
      where: { id: dto.chat },
    });

    if (!chat) throw new NotFoundException('Чат с таким названием не найден!');

    const user: UsersEntity = await this.usersRepository.findOne({
      where: { id: dto.author },
    });

    if (!user) throw new NotFoundException('Пользователь не найден!');

    const newMessage = await this.messagesRepository.save({
      id: randomUUID(),
      chat,
      author: user,
      text: dto.text,
    });

    return { id: newMessage.id };
  }

  async getChats(dto: GetChatsDto): Promise<ChatsEntity[]> {
    const chats: ChatsEntity[] = await this.chatsRepository.find({
      where: {
        users: {
          id: dto.user,
        },
      },
      relations: ['message'],
      order: {
        message: {
          created_at: 'ASC',
        },
      },
    });

    if (chats.length === 0) throw new NotFoundException('Чаты не найдены!');

    return chats;
  }

  async getMessages(dto: GetMessagesDto): Promise<MessagesEntity[]> {
    const messages: MessagesEntity[] = await this.messagesRepository.find({
      where: {
        chat: {
          id: dto.chat,
        },
      },
      relations: ['chat', 'author'],
      order: {
        created_at: 'DESC',
      },
    });

    if (messages.length === 0)
      throw new NotFoundException('Сообщения в чате не найдены!');

    return messages;
  }
}
