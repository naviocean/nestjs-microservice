import {
  LoginDTO,
  RefreshDTO,
  ReponseLoginDTO,
} from '@nestjs-microservice/dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @ApiBody({ type: LoginDTO })
  @ApiResponse({
    status: 200,
    description: 'The User has successfully login.',
    type: ReponseLoginDTO,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  login(@Body() loginDTO: LoginDTO): Promise<ReponseLoginDTO> {
    return this.authService.postLogin(loginDTO);
  }

  @Post('refresh')
  @ApiBody({ type: RefreshDTO })
  @ApiResponse({
    status: 200,
    description: 'Refresh token successfully.',
    type: ReponseLoginDTO,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  refresh(@Body() refreshDTO: RefreshDTO): Promise<ReponseLoginDTO> {
    return this.authService.refreshToken(refreshDTO);
  }

  @Get('status')
  @Auth({ roles: [Role.ADMIN], description: 'Get status successfully' })
  status() {
    return {
      message: 'hello',
    };
  }
}
