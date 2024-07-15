import { PostLoginDto, ResponseLogin } from '@nestjs-microservice/proto';
import { Injectable, Logger } from '@nestjs/common';
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
    const { password, ...data } = findUser;
    return data;
  }
}
