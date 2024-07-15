import {
  AuthServiceController,
  PostLoginDto,
} from '@nestjs-microservice/proto';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'PostLogin')
  async postLogin(PostLoginDto: PostLoginDto) {
    return await this.authService.postLogin(PostLoginDto);
  }
}
