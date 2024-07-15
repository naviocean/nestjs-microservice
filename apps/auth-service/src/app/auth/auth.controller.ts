import { LoginDto } from '@nestjs-microservice/dto';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Auth } from './decorators/auth.decorator';
import { LocalAuthGuard } from './guards/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
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
  @Auth({ roles: [Role.ADMIN], description: 'Get status successfully' })
  status(@Request() req) {
    console.log('Inside AuthController status method');
    return req.user;
  }
}
