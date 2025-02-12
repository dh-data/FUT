import { Controller, Post, Headers } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  createChat(@Headers('authorization') authorization: string): Promise<Chat> {
    // TODO: 从 authorization 中获取 userId
    return this.chatService.createChat('user_13580597747');
  }
}
