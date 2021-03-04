import { HttpException } from '@nestjs/common';

class CodeAndMsg {
  CODE: number;
  MESSAGE: string;
  status: number;
}

export class ErrorCode {
  static readonly loginError: CodeAndMsg = {
    CODE: 1000,
    MESSAGE: '用户名或密码错误',
    status: 403,
  };

  static readonly usernameConflictError: CodeAndMsg = {
    CODE: 1001,
    MESSAGE: '用户名已存在',
    status: 409,
  };

  static readonly permissionError: CodeAndMsg = {
    CODE: 101,
    MESSAGE: '权限不足',
    status: 403,
  };

  static readonly sortError: CodeAndMsg = {
    CODE: 2001,
    MESSAGE: '无该模块排序字段',
    status: 400,
  };
}

export class MyHttpException extends HttpException {
  constructor(errorCode: CodeAndMsg) {
    super(
      { CODE: errorCode.CODE, MESSAGE: errorCode.MESSAGE },
      errorCode.status,
    );
  }
}
