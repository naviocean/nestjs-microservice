import {
  AUTH_SERVICE_NAME,
  AuthServiceController,
  GetRtHashDTO,
  PostLoginDTO,
  PostRtHashDTO,
} from '@nestjs-microservice/proto';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod(AUTH_SERVICE_NAME, 'PostLogin')
  async postLogin(postLoginDTO: PostLoginDTO) {
    return await this.authService.postLogin(postLoginDTO);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'postRtHash')
  async postRtHash(postRtHashDTO: PostRtHashDTO) {
    return await this.authService.postRtHash(postRtHashDTO);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'getRtHash')
  async getRtHash(getRtHashDTO: GetRtHashDTO) {
    return await this.authService.getRtHash(getRtHashDTO);
  }
}
