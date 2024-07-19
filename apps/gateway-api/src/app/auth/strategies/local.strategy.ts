import { Injectable, Logger } from '@nestjs/common';
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

  validate(req, username: string, password: string) {
    console.log('zzzzz', req.body);
    return {
      username: 'xxxx',
    };
    // console.log('ffffff');
    // const errors = await validate(new LoginDto(req));

    // const user = this.authService.postLogin({ username, password });
    // console.log('aaaaa', user);
    // const user = await this.authService.validateUser({ username, password });
    // if (!user) throw new UnauthorizedException();
    // return user;
  }
}
