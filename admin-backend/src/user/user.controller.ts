import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Header,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { adminSecret } from 'src/constant';
import { ErrorCode, MyHttpException } from 'src/core/exception';
import { AddUserDto, LoginDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @Header('Access-Control-Allow-Credentials', 'true')
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, expires } = await this.userService.login(body);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: expires,
    });
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
