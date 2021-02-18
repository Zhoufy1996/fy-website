declare interface JwtValidatePayload {
  id: number;
  username: string;
}

declare interface JwtSignData {
  sub: number;
  username: string;
}

declare interface JwtReq {
  user: JwtValidatePayload;
}
