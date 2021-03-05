/**
 * jwt 校验登录之后 通过bear进行校验
 */
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import config from '../../config.json';

const cookieExtractor = (req: Request) => {
  let token = '';
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(payload: JwtSignData): Promise<JwtValidatePayload> {
    return { id: payload.sub, username: payload.username };
  }
}
