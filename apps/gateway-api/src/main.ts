/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { GrpcExceptionFilter } from './filters/grpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // transform: true,
    })
  );
  app.useGlobalFilters(new GrpcExceptionFilter());
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('port');
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
