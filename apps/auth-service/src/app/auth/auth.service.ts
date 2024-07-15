import { LoginDto } from '@nestjs-microservice/dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async validateUser(loginDto: LoginDto): Promise<{
    access_token: string;
  }> {
    const findUser = await this.userService.user({
      username: loginDto.username,
    });

    if (!findUser) {
      throw new UnauthorizedException(`No user found: ${loginDto.username}`);
    }

    const isPasswordMatched = await compare(
      loginDto.password,
      findUser.password
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException(`Invalid password`);
    }

    const { password, ...data } = findUser;
    return {
      access_token: await this.jwtService.signAsync(data),
    };
  }
}
