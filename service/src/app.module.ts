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
import { ProfileModule } from './profile/profile.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Chat]),
    ChatModule,
    ProfileModule
  ],
  controllers: [AppController, ProfileController, ChatController],
  providers: [AppService, ProfileService, ChatService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/profile');
  }
}
