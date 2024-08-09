import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { MESSAGE } from './message.const';

export const Auth = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user) {
      return user;
    } else {
      throw new HttpException(MESSAGE.AUTH_INVALID, 401);
    }
  },
);
