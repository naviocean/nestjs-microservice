import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class ATStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(ATStrategy.name);

  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.at_secret'),
    });

    this.logger.log('ATStrategy initialized');
  }

  validate(payload: any) {
    console.log('Inside AT Strategy Validate');
    // console.log(payload);
    return payload;
  }
}
