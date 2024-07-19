import { status } from '@grpc/grpc-js';
import {
  GetRtHashDTO,
  PostLoginDTO,
  PostRtHashDTO,
  ResponseLoginDTO,
  ResponseRtHashDTO,
} from '@nestjs-microservice/proto';
import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly usersService: UsersService) {}

  async postLogin(postLoginDTO: PostLoginDTO): Promise<ResponseLoginDTO> {
    this.logger.log('postLogin: ', JSON.stringify(postLoginDTO));
    const findUser = await this.usersService.user({
      username: postLoginDTO.username,
    });
    if (!findUser)
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'No User Found',
      });

    const isPasswordMatched = await compare(
      postLoginDTO.password,
      findUser.password
    );

    if (!isPasswordMatched) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'Invalid password',
      });
    }

    const { password, hashedRT, ...data } = findUser;
    return data;
  }

  async postRtHash(postRtHashDto: PostRtHashDTO): Promise<void> {
    this.logger.log('postRtHash: ', JSON.stringify(postRtHashDto));
    const updateUser = await this.usersService.updateUser({
      where: { username: postRtHashDto.username },
      data: {
        hashedRT: postRtHashDto.hashedRT,
      },
    });

    if (!updateUser)
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'No User Found',
      });
  }

  async getRtHash(getRtHashDTO: GetRtHashDTO): Promise<ResponseRtHashDTO> {
    this.logger.log('getRTHash: ', JSON.stringify(getRtHashDTO));
    const findUser = await this.usersService.user({
      username: getRtHashDTO.username,
    });
    if (!findUser)
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'No User Found',
      });

    return {
      hashedRT: findUser.hashedRT,
    };
  }
}
