import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './middleware/auth';
import { ChatModule } from './chat/chat.module';
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
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/profile', '/chat');
  }
}
