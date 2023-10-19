/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as cors from 'cors';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'https://galp.vercel.app',
        'http://galp.vercel.app',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      allowedHeaders: 'Content-Type, Accept',
    }),
  );

  await app.listen(3333);
}
bootstrap();
