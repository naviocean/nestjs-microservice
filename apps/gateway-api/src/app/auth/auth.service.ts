import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  PostLoginDto,
  ResponseLogin,
} from '@nestjs-microservice/proto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private authServiceClient: AuthServiceClient;
  constructor(@Inject(AUTH_PACKAGE_NAME) private clientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.authServiceClient =
      this.clientGrpc.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  postLogin(PostLoginDto: PostLoginDto): Observable<ResponseLogin> {
    return this.authServiceClient.postLogin(PostLoginDto);
  }
}
