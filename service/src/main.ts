import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { clerkMiddleware } from '@clerk/express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(clerkMiddleware({
    debug: true,
    publishableKey: 'pk_test_bmVhcmJ5LW9zdHJpY2gtMS5jbGVyay5hY2NvdW50cy5kZXYk',
    secretKey: 'sk_test_DROm0dWskKKeCJzojZCdCnzZPT8d0QtUEH2oAcs4bX',
  }));
  const options = new DocumentBuilder()
    .setTitle('FUT API')
    .setDescription('FUT API description')
    .setVersion('1.0')
    .addTag('fut')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 2000);
}
bootstrap();
