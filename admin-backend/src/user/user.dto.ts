import { IsBoolean, Length } from 'class-validator';

export class LoginDto {
  @Length(6, 20)
  username: string;

  @Length(6, 20)
  password: string;

  @IsBoolean()
  remember: boolean;
}
