import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey', // 需要一个默认的密钥，即使不用于签名
      signOptions: { expiresIn: '24h' }
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}