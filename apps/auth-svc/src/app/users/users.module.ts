import { PrismaClientModule } from '@nestjs-microservice/prisma-client';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
@Module({
  imports: [PrismaClientModule],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
