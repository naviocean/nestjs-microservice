import { AUTH_PACKAGE_NAME } from '@nestjs-microservice/proto';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { join } from 'path';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ATStrategy } from './strategies/at.strategy';
import { RTStrategy } from './strategies/rt.strategy';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'auth',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: AUTH_PACKAGE_NAME,
            // url: `${configService.get<string>('grpc_url.auth')}`,
            protoPath: join(
              __dirname,
              '../../../packages/proto/src/auth.proto'
            ),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: {
            expiresIn: configService.get<string>('jwt.exp'),
          },
        };
      },
    }),
  ],
  providers: [AuthService, ATStrategy, RTStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
