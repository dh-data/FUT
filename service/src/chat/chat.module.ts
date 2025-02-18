import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat } from './chat.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([Chat]), JwtModule.register({
    secret: 'yourSecretKey', // 需要一个默认的密钥，即使不用于签名
    signOptions: { expiresIn: '24h' }
  })],
  controllers: [ChatController],
  providers: [ChatService, JwtService],
})
export class ChatModule {} 