import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Chat, Message, ChatStatus } from './chat.entity';
import { OpenAI } from 'openai';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async createChat(userId: string, title?: string): Promise<Chat> {
    return this.chatRepository.save(Object.assign(new Chat(), {
        id: uuidv4(),
        userId,
        title: title || null,
        status: ChatStatus.ENABLED,
        createdAt: new Date(),
        messages: [],
      }));
  }

  async getChatResponse(userId: string, id: string, prompt?: string): Promise<any> {
    if (!id) {
      throw new Error('Chat ID is required');
    }

    const existingChat = await this.chatRepository.findOne({ 
      where: { 
        id,
        userId
      } 
    });

    if (!existingChat) {
      throw new Error('Chat not found');
    }

    const openai = new OpenAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      apiKey: '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'
    });

    const msgs: any[] = []
    if(prompt) {
      existingChat.messages.forEach(msg => {
        msgs.push({
          role: msg.role,
          content: msg.content
        });
      });
      msgs.push({
        role: 'user',
        content: prompt
      });
      const responseStream = await openai.chat.completions.create({
        model: "deepseek-ai/deepseek-r1",
        temperature: 0.6,
        top_p: 0.7,
        max_tokens: 4096,
        stream: true,
        messages: msgs
      });
    
      return responseStream; 
    } else {
      throw new Error('Prompt is required');
    }
  }

  async addMessage(chatId: string, content: string, role: 'user' | 'assistant' | 'system'): Promise<Chat> {
    const chat = await this.chatRepository.findOne({ where: { id: chatId } });
    if (!chat) {
      throw new Error('Chat not found');
    }

    const newMessage: Message = {
      content,
      role,
      createdAt: new Date()
    };

    chat.messages.push(newMessage);
    return this.chatRepository.save(chat);
  }

  // 更新聊天状态
  async updateChatStatus(chatId: string, status: ChatStatus): Promise<Chat> {
    const chat = await this.chatRepository.findOne({ where: { id: chatId } });
    if (!chat) {
      throw new Error('Chat not found');
    }

    chat.status = status;
    return this.chatRepository.save(chat);
  }

  // 软删除聊天
  async deleteChat(chatId: string): Promise<Chat> {
    return this.updateChatStatus(chatId, ChatStatus.DELETED);
  }

  // 禁用聊天
  async disableChat(chatId: string): Promise<Chat> {
    return this.updateChatStatus(chatId, ChatStatus.DISABLED);
  }

  // 启用聊天
  async enableChat(chatId: string): Promise<Chat> {
    return this.updateChatStatus(chatId, ChatStatus.ENABLED);
  }

  // 获取用户的会话列表
  async getUserChats(userId: string): Promise<(Omit<Chat, 'createdAt'>)[]> {
    const chats = await this.chatRepository.find({
      where: {
        userId,
        status: ChatStatus.ENABLED,
      },
      order: {
        createdAt: 'DESC',
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        title: true,
        messages: true,
        // userId 字段不选择，这样就不会输出
      },
    });

    // 将 createdAt 转换为毫秒时间戳
    return chats.map(chat => ({
      ...chat,
      createdAt: chat.createdAt.getTime(),
    }));
  }
}
