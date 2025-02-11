import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { clerkMiddleware } from '@clerk/express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(clerkMiddleware({
    debug: true,
    publishableKey: 'pk_test_bmVhcmJ5LW9zdHJpY2gtMS5jbGVyay5hY2NvdW50cy5kZXYk',
    secretKey: 'sk_test_DROm0dWskKKeCJzojZCdCnzZPT8d0QtUEH2oAcs4bX',
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
