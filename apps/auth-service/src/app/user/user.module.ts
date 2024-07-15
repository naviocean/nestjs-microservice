import { PrismaClientModule } from '@nestjs-microservice/prisma-client';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
@Module({
  imports: [PrismaClientModule],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
