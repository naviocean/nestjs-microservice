import { PostLoginDto } from '@nestjs-microservice/proto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() postLoginDto: PostLoginDto) {
    return this.authService.postLogin(postLoginDto);
  }
}
