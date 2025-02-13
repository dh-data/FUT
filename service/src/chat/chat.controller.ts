import { Controller, Post, Headers, Get, Body } from '@nestjs/common';  
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getUserChats(@Headers('authorization') authorization: string): Promise<(Omit<Chat, 'createdAt'>)[]> {
    // TODO: 从 authorization 中获取 userId
    return this.chatService.getUserChats('user_13580597747');
  }
  @Post()
  createChat(@Headers('authorization') authorization: string, @Body() body: { title?: string, id?: string, prompt?: string }): Promise<any> {
    if(!body.id) {
      return this.chatService.createChat('user_13580597747', body.title);
    } else {
      return this.chatService.getChatResponse('user_13580597747', body.id, body.prompt);
    }
  }
}
