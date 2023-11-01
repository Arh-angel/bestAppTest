import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = new ConfigService().get('PORT') || 9000;
  await app.listen(port, () => console.log(`Server start in port: ${port}`));
}
bootstrap();
