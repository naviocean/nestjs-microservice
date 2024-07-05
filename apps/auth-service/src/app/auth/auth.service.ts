import { LoginDto } from '@nestjs-microservice/dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users = [
    {
      id: 1,
      username: 'admin',
      password: 'password',
    },
    {
      id: 2,
      username: 'bim',
      passworld: '123456',
    },
  ];
  constructor(private jwtService: JwtService) {}

  validateUser({ username, password }: LoginDto): {
    access_token: string;
  } {
    const findUser = this.users.find(
      (user) => user.username === username && user.password === password
    );
    if (findUser) {
      // Destructure the password
      const { password, ...data } = findUser;

      return {
        access_token: this.jwtService.sign(data),
      };
    }
    return null;
  }
}
