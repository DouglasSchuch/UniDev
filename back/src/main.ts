// imports NestJS
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// imports libs
import { useContainer } from 'class-validator';

// imports local
import { AppModule } from './app.module';

async function bootstrap() {
  // setup
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // swagger
  const config = new DocumentBuilder().setTitle('SynecoTools').setDescription('The SynecoTools MVP 1 (Alpha)').setVersion('0.0.7').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // start microservices
  await app.startAllMicroservices().catch(error => error);
  await app.listen(process.env.PORT).catch(error => error);
}

bootstrap();
