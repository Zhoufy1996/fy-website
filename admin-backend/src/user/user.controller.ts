import { Body, Controller, Header, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { LoginDto } from './user.dto';
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
      maxAge: expires * 1000,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('verifyToken')
  async verifyToken() {
    return '';
  }
}
