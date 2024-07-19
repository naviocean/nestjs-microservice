import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class RefreshDTO {
  @ApiProperty()
  @IsNotEmpty()
  refresh_token: string;
}

export class ReponseLoginDTO {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
