import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private authService: AuthService) {
    super();
    this.logger.log('LocalStrategy initialized');
  }

  async validate(
    username: string,
    password: string
  ): Promise<{ access_token: string } | null> {
    // console.log('Inside LocalStrategy');
    const user = await this.authService.validateUser({ username, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
