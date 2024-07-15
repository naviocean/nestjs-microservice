import { AUTH_PACKAGE_NAME } from '@nestjs-microservice/proto';
import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app: INestMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../../../packages/proto/src/auth.proto'),
        package: AUTH_PACKAGE_NAME,
      },
    });
  // app.useLogger(app.get<Logger, LoggerService>(Logger));
  await app.listen();
}

bootstrap();
