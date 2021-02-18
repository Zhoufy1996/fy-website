import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode, MyHttpException } from 'src/core/exception';
import { decrypt, encrypt } from 'src/shared/utils/crypto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async login({ username, password }: { username: string; password: string }) {
    const user = await this.findUserByUsername(username);
    if (user == null) {
      throw new MyHttpException(ErrorCode.loginError);
    }
    await this.verifyPassword({ user, password });
    const accessToken = await this.jwtService.sign({
      username,
      sub: user.id,
    });
    return {
      accessToken,
    };
  }

  async adduser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const _user = await this.findUserByUsername(username);
    if (_user != null) {
      throw new MyHttpException(ErrorCode.usernameConflictError);
    }

    const user = new User();
    user.username = username;
    user.createdAt = new Date();
    user.password = encrypt(password);
    return this.userRepository.save(user);
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = this.userRepository.findOne({ username });
    return user;
  }

  async verifyPassword({ user, password }: { user: User; password: string }) {
    if (decrypt(user.password) !== password) {
      throw new MyHttpException(ErrorCode.loginError);
    }
  }
}
