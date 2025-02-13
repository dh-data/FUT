import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { AuthMiddleware } from './middleware/auth';
import { ChatModule } from './chat/chat.module';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { databaseConfig } from './chat/config/database.config';
import { Chat } from './chat/chat.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Chat]),
    ChatModule
  ],
  controllers: [AppController, ProfileController, ChatController],
  providers: [AppService, ProfileService, ChatService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/profile');
  }
}
