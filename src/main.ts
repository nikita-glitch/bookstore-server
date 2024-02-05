import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const corsOptions = {
  "origin": 'http://localhost:3000',
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "allowedHeaders": ['Content-Type', 'Authorization'],
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions)
  app.setGlobalPrefix('/api/v1');

  await app.listen(5000, () => console.log(`SERVER STARTED ON PORT ${process.env.PORT}`));
}
bootstrap();
