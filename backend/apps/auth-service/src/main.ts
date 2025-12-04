import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  const config = new DocumentBuilder()
    .setTitle('Auth Service API')
    .setDescription('Auth Service API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('auth-service-api-docs', app, document);

  await app.listen(process.env.port ?? 3001);
}
bootstrap();
