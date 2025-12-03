import { NestFactory } from '@nestjs/core';
import { LibraryServiceModule } from './library-service.module';

async function bootstrap() {
  const app = await NestFactory.create(LibraryServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
