import { status } from '@grpc/grpc-js';
import { PostLoginDto, ResponseLogin } from '@nestjs-microservice/proto';
import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly usersService: UsersService) {}

  async postLogin(PostLoginDto: PostLoginDto): Promise<ResponseLogin> {
    this.logger.log('postLogin: ', JSON.stringify(PostLoginDto));
    const findUser = await this.usersService.user({
      username: PostLoginDto.username,
    });
    if (!findUser)
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'No User Found',
      });

    const isPasswordMatched = await compare(
      PostLoginDto.password,
      findUser.password
    );

    if (!isPasswordMatched) {
      throw new RpcException({
        code: status.UNAUTHENTICATED,
        message: 'Invalid password',
      });
    }

    const { password, ...data } = findUser;
    return data;
  }
}
