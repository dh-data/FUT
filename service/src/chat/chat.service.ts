import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Chat, Message, ChatStatus } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async createChat(userId: string): Promise<Chat> {
    return this.chatRepository.save(Object.assign(new Chat(), {
        id: uuidv4(),
        userId,
        status: ChatStatus.ENABLED,
        createdAt: new Date(),
        messages: [],
      }));
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
  async getUserChats(userId: string): Promise<Chat[]> {
    return this.chatRepository.find({
      where: {
        userId,
        status: ChatStatus.ENABLED, // 只返回启用状态的会话
      },
      order: {
        createdAt: 'DESC', // 按创建时间倒序排列
      },
    });
  }
}
