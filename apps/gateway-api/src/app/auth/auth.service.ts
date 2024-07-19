import { RefreshDTO, ReponseLoginDTO } from '@nestjs-microservice/dto';
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  PostLoginDTO,
  ResponseLoginDTO,
} from '@nestjs-microservice/proto';
import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import { compare, hash } from 'bcrypt';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private authServiceClient: AuthServiceClient;
  constructor(
    @Inject(AUTH_PACKAGE_NAME) private clientGrpc: ClientGrpc,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  onModuleInit() {
    this.authServiceClient =
      this.clientGrpc.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async postLogin(postLoginDTO: PostLoginDTO): Promise<ReponseLoginDTO> {
    const user: ResponseLoginDTO = await lastValueFrom(
      this.authServiceClient.postLogin(postLoginDTO)
    );

    return await this.getTokens(user);
  }

  async refreshToken(refreshDTO: RefreshDTO): Promise<ReponseLoginDTO> {
    const decoded = await this.jwtService.verifyAsync(
      refreshDTO.refresh_token,
      {
        secret: this.configService.get<string>('jwt.rt_secret'),
      }
    );
    const hashedRt = await lastValueFrom(
      this.authServiceClient.getRtHash({ username: decoded.username })
    );
    if (!hashedRt) throw new BadRequestException('Invalid Refresh Token');

    const isMatched = await compare(
      refreshDTO.refresh_token,
      hashedRt.hashedRT
    );

    if (!isMatched) throw new BadRequestException('Invalid Refresh Token');

    const { iat, exp, ...data } = decoded;

    return await this.getTokens(data);
  }

  async getTokens(data: ResponseLoginDTO): Promise<ReponseLoginDTO> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          ...data,
        },
        {
          secret: this.configService.get<string>('jwt.at_secret'),
          expiresIn: this.configService.get<string>('jwt.at_exp'),
        }
      ),
      this.jwtService.signAsync(
        {
          ...data,
        },
        {
          secret: this.configService.get<string>('jwt.rt_secret'),
          expiresIn: this.configService.get<string>('jwt.rt_exp'),
        }
      ),
    ]);

    const hashedRT = await hash(rt, 1);
    await lastValueFrom(
      this.authServiceClient.postRtHash({ username: data.username, hashedRT })
    );

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
