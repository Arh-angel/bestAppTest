import { Body, Controller, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { AddChatDto } from './inputs/add.chat.dto';
import { AddChatViewModel } from './view/add.chat.view.model';
import { AddMessageDto } from './inputs/add.message.dto';
import { AddMessageViewModel } from './view/add.message.view.model';
import { GetChatsDto } from './inputs/get.chats.dto';
import { ChatsEntity } from './entities/chats.entity';
import { GetMessagesDto } from './inputs/get.messages.dto';
import { MessagesEntity } from './entities/messages.entity';

@Controller()
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('chats/add')
  async addChat(@Body() dto: AddChatDto): Promise<AddChatViewModel> {
    return await this.chatsService.addChat(dto);
  }

  @Post('messages/add')
  async addMessage(@Body() dto: AddMessageDto): Promise<AddMessageViewModel> {
    return await this.chatsService.addMessage(dto);
  }

  @Post('chats/get')
  async getChats(@Body() dto: GetChatsDto): Promise<ChatsEntity[]> {
    return await this.chatsService.getChats(dto);
  }

  @Post('messages/get')
  async getMessages(@Body() dto: GetMessagesDto): Promise<MessagesEntity[]> {
    return await this.chatsService.getMessages(dto);
  }
}
