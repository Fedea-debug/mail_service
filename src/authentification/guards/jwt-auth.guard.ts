import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status: any,
  ) {
    const isCheckAuth = this.reflector.get<boolean>(
      'isCheckAuth',
      context.getHandler(),
    );

    if (info instanceof JsonWebTokenError || info?.message == 'No auth token') {
      if (isCheckAuth) {
        const request = context.switchToHttp().getRequest();
        request.customResponse = {
          authorized: false,
          need_captcha: false,
        };
        return user;
      }
      throw new UnauthorizedException();
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
