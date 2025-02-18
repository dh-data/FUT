import { Controller, Post, Headers, Get, Body, Res, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { CreateChatDto, ChatParamDto, RecordMsgDto } from './chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * 获取用户的会话列表
   * @param authorization - 用户的授权信息
   * @returns 用户的会话列表
   */
  @Get()
  @ApiOperation({ summary: '获取用户的会话列表' })
  async getUserChats(@Headers('authorization') authorization: string): Promise<(Omit<Chat, 'createdAt'>)[]> {
    return this.chatService.getUserChats(authorization);
  }

  /**
   * 获取用户的会话消息列表
   * @param authorization - 用户的授权信息
   * @param id - chatID
   * @returns 用户的会话列表
   */
  @Get(':chat_id')
  @ApiOperation({ summary: '查询会话消息列表' })
  async getUserChatMsg(@Headers('authorization') authorization: string, @Param('chat_id') id: string): Promise<(Omit<Chat, 'createdAt'>)[]> {
    return this.chatService.getUserChatMsg(authorization, id);
  }
  
  /**
   * 发送聊天对话
   * @param response - HTTP 响应对象
   * @param authorization - 用户的授权信息
   * @param body - prompt
   * @returns 聊天的响应
   */
  @Post(':chat_id')
  @ApiOperation({ summary: '发送聊天对话' })
  async startChat(@Res() response: Response, @Headers('authorization') authorization: string, @Param('chat_id') id: string, @Body() body: ChatParamDto): Promise<any> {
      if (!body.prompt) {
        response.status(400).json({ error: 'Prompt is required' });
        return;
      }
      try {
        const responseStream = await this.chatService.getChatResponse(authorization, id, body.prompt);
        response.setHeader('Content-Type', 'text/event-stream');

        for await (const chunk of responseStream) {
          console.log(chunk.choices[0].delta);
          response.write(JSON.stringify(chunk.choices[0].delta));
        }

        response.end();
        this.chatService.addMessage(authorization, id, body.prompt, 'user');
      } catch (error) {
        console.error('Stream error:', error);
        response.status(500).json({ error: 'Stream error' });
      }
    
  }

  /**
   * 创建新的聊天
   * @param response - HTTP 响应对象
   * @param authorization - 用户的授权信息
   * @param body - 创建聊天所需的参数
   * @returns 聊天的响应
   */
  @Post()
  @ApiOperation({ summary: '创建新的聊天' })
  async createChat(@Res() response: Response, @Headers('authorization') authorization: string, @Body() body: CreateChatDto): Promise<any> {
    const chat = await this.chatService.createChat(authorization, body?.title);
    response.status(200).send(chat.id);
  }

  /**
   * 添加会话消息
   * @param authorization - 用户的授权信息
   * @param id - chatID
   * @param body - 消息内容
   * @returns void
   */
  @Post(':chat_id')
  @ApiOperation({ summary: '添加会话消息（用于流式消息返回结束后，记录本条对话消息）' })
  async addChatMessage(@Headers('authorization') authorization: string, @Param('chat_id') chat_id: string, @Body() body: RecordMsgDto): Promise<void> {
    this.chatService.addMessage(authorization, chat_id, body.content, 'system');
  }
}
