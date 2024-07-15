import { LoginDto } from '@nestjs-microservice/dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    try {
      return this.authService.postLogin(loginDto);
    } catch (error) {
      console.log('zzzzz', error);
    }
  }
}
