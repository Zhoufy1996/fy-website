import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { adminSecret } from 'src/constant';
import { ErrorCode, MyHttpException } from 'src/core/exception';
import { AddUserDto, LoginDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('add')
  async addUser(@Body() body: AddUserDto) {
    if (body.secret !== adminSecret) {
      throw new MyHttpException(ErrorCode.permissionError);
    }
    return this.userService.adduser(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('verifytoken')
  async verifyToken() {
    return '';
  }
}
