import { Controller, Post, Headers, Get, Body, Res } from '@nestjs/common';  
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { Response } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getUserChats(@Headers('authorization') authorization: string): Promise<(Omit<Chat, 'createdAt'>)[]> {
    // TODO: 从 authorization 中获取 userId
    return this.chatService.getUserChats('user_13580597747');
  }
  @Post()
  async createChat(@Res() response: Response, @Headers('authorization') authorization: string, @Body() body: { title?: string, id?: string, prompt?: string }): Promise<any> {
    if (!body.id) {
      return this.chatService.createChat('user_13580597747', body.title);
    } else {
      try {
        const responseStream = await this.chatService.getChatResponse('user_13580597747', body.id, body.prompt);
        response.setHeader('Content-Type', 'text/event-stream');

        for await (const chunk of responseStream) {
          console.log(chunk.choices[0].delta)
          response.write(JSON.stringify(chunk.choices[0].delta));
        }

        response.end();
      } catch (error) {
        console.error('Stream error:', error);
        response.status(500).json({ error: 'Stream error' });
      }
    }
  }
}
