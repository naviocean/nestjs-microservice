import { LoginDto } from '@nestjs-microservice/dto';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'The User has successfully login.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  login(@Request() req) {
    console.log('Inside AuthController logins method');
    return req.user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Get status successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  status(@Request() req) {
    console.log('Inside AuthController status method');
    return req.user;
  }
}
