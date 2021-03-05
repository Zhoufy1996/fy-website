import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorCode, MyHttpException } from 'src/core/exception';
import { decrypt } from 'src/core/utils/crypto';
import { getExpires } from 'src/core/utils/token';
import { User } from './user.entity';
import { LoginProps } from './user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login({ username, password, remember }: LoginProps) {
    const user = await this.findUserByUsername(username);
    if (user == null) {
      throw new MyHttpException(ErrorCode.loginError);
    }
    await this.verifyPassword({ user, password });
    const expires = getExpires(remember);
    const token = await this.jwtService.sign(
      {
        username,
        sub: user.id,
      },
      {
        expiresIn: expires,
      },
    );
    return {
      token,
      expires,
    };
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }

  async verifyPassword({ user, password }: { user: User; password: string }) {
    if (decrypt(user.password) !== password) {
      throw new MyHttpException(ErrorCode.loginError);
    }
  }
}
