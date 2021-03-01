import { IsBoolean, IsString, Length } from 'class-validator';

class UsernameAndPassword {
  @Length(6, 20)
  username: string;

  @Length(6, 20)
  password: string;

  @IsBoolean()
  remember: boolean;
}

export class LoginDto extends UsernameAndPassword {}
export class AddUserDto extends UsernameAndPassword {
  @IsString()
  secret: string;
}
